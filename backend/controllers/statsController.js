// utils/fetchPlatformData.js
import axios from "axios";
import LeetCode from "leetcode-query";
import { User } from "../models/User.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// ✅ Only using proxor for CodeChef (no normalization)
const { getCodeChefData } = require("proxor");

const lc = new LeetCode();

/* ==========================
   Fetch Platform Functions
========================== */

const fetchLeetCodeStats = async (leetcodeUsername) => {
  try {
    const response = await lc.user(leetcodeUsername);
    // console.log(response)
    return response;
  } catch (error) {
    console.error("LeetCode Error:", error.message);
    return { error: "Failed to fetch LeetCode data" };
  }
};

const fetchCodeforcesStats = async (username) => {
  try {
    const userInfoRes = await axios.get(
      `https://codeforces.com/api/user.info?handles=${username}`,{withCredentials: true}
    );
    const userData = userInfoRes.data.result[0];

    const submissionsRes = await axios.get(
      `https://codeforces.com/api/user.status?handle=${username}`,{withCredentials: true}
    );
    const submissions = submissionsRes.data.result;

    const contestHistoryRes = await axios.get(
      `https://codeforces.com/api/user.rating?handle=${username}`,{withCredentials: true}   
    );
    const contestHistoryRaw = contestHistoryRes.data.result;

    const contestHistory = contestHistoryRaw.map((entry) => ({
      contestName: entry.contestName,
      oldRating: entry.oldRating,
      newRating: entry.newRating,
      rank: entry.rank,
      date: new Date(entry.ratingUpdateTimeSeconds * 1000),
    }));

    const solvedSet = new Set();
    const ratingMap = {};

    submissions.forEach((submission) => {
      if (submission.verdict === "OK") {
        const problem = submission.problem;
        const problemId = `${problem.contestId}-${problem.index}`;

        if (!solvedSet.has(problemId)) {
          solvedSet.add(problemId);
          if (problem.rating) {
            ratingMap[problem.rating] = (ratingMap[problem.rating] || 0) + 1;
          }
        }
      }
    });

    const formattedSubmissions = submissions.map((submission) => ({
      id: submission.id,
      problem: submission.problem,
      verdict: submission.verdict,
      time: submission.creationTimeSeconds,
      date: new Date(submission.creationTimeSeconds * 1000).toLocaleString(),
    }));

    return {
      handle: userData.handle,
      rating: userData.rating,
      maxRating: userData.maxRating,
      rank: userData.rank,
      maxRank: userData.maxRank,
      contribution: userData.contribution,
      friendOfCount: userData.friendOfCount,
      avatar: userData.avatar,
      totalSolved: solvedSet.size,
      solvedByRating: ratingMap,
      submissions: formattedSubmissions,
      contestHistory,
    };
  } catch (error) {
    console.error("Codeforces Error:", error.message);
    return { error: "Failed to fetch Codeforces data" };
  }
};

// ✅ Switched to proxor for CodeChef (no normalization)
const fetchCodechefStats = async (codechefUsername) => {
  try {
    if (!codechefUsername) {
      return { error: "No CodeChef username provided" };
    }
    const data = await getCodeChefData(codechefUsername);
    console.log(data);
    return data; // returning proxor output as-is
  } catch (error) {
    console.error("CodeChef Error:", error.message);
    return { error: "Failed to fetch CodeChef data" };
  }
};

const fetchGeeksForGeeksStats = async (gfgUsername) => {
  try {
    const response = await axios.get(
      `https://geeks-for-geeks-api.vercel.app/${gfgUsername}`,{withCredentials: true}
    ); 
    // console.log(response.data)
    return response.data;

  } catch (error) {
    console.error("GFG Error:", error.message);
    return { error: "Failed to fetch GeeksforGeeks data" };
  }
};

/* ==========================
   Combined Controller
========================== */

const getAllPlatformStats = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const {
      leetcodeHandle: leetcodeUsername,
      codechefHandle: codechefUsername,
      codeforcesHandle: codeforcesUsername,
      gfgHandle: gfgUsername,
    } = user;

    const [leetcode, codechef, codeforces, gfg] = await Promise.all([
      fetchLeetCodeStats(leetcodeUsername),
      fetchCodechefStats(codechefUsername), // now via proxor
      fetchCodeforcesStats(codeforcesUsername),
      fetchGeeksForGeeksStats(gfgUsername),
    ]);

    res.status(200).json({
      leetcode,
      codechef,
      codeforces,
      gfg,
    });
  } catch (err) {
    console.error("Combined Error:", err.message);
    res.status(500).json({ error: "Failed to fetch data from all platforms" });
  }
};

/* ==========================
   Individual Controllers
========================== */

const getLeetCodeStats = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user || !user.leetcodeHandle) {
      return res
        .status(404)
        .json({ error: "LeetCode handle not found for user" });
    }
    const stats = await fetchLeetCodeStats(user.leetcodeHandle);
    res.status(200).json(stats);
  } catch (err) {
    console.error("LeetCode Fetch Error:", err.message);
    res.status(500).json({ error: "Failed to fetch LeetCode stats" });
  }
};

const getCodeforcesStats = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user || !user.codeforcesHandle) {
      return res
        .status(404)
        .json({ error: "Codeforces handle not found for user" });
    }
    const stats = await fetchCodeforcesStats(user.codeforcesHandle);
    res.status(200).json(stats);
  } catch (err) {
    console.error("Codeforces Fetch Error:", err.message);
    res.status(500).json({ error: "Failed to fetch Codeforces stats" });
  }
};

const getCodechefStats = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user || !user.codechefHandle) {
      return res
        .status(404)
        .json({ error: "CodeChef handle not found for user" });
    }
    const stats = await fetchCodechefStats(user.codechefHandle);
    res.status(200).json(stats);
  } catch (err) {
    console.error("CodeChef Fetch Error:", err.message);
    res.status(500).json({ error: "Failed to fetch CodeChef stats" });
  }
};

const getGeeksForGeeksStats = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user || !user.gfgHandle) {
      return res.status(404).json({ error: "GFG handle not found for user" });
    }
    const stats = await fetchGeeksForGeeksStats(user.gfgHandle);
    res.status(200).json(stats);
  } catch (err) {
    console.error("GFG Fetch Error:", err.message);
    res.status(500).json({ error: "Failed to fetch GFG stats" });
  }
};

/* ==========================
   Exports
========================== */
export {
  fetchLeetCodeStats,
  fetchCodeforcesStats,
  fetchCodechefStats, // proxor-backed
  fetchGeeksForGeeksStats,
  getAllPlatformStats,
  getLeetCodeStats,
  getCodeforcesStats,
  getCodechefStats,
  getGeeksForGeeksStats,
};
