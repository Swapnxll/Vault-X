import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import axios from "axios";

// export const checkbreach = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ error: "Email is required" });
//     }

//     // Call XposedOrNot API
//     const breachRes = await axios.get(
//       `https://api.xposedornot.com/v1/breach-analytics?email=${email}`,
//       {
//         headers: {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
//           Accept: "application/json",
//         },
//       }
//     );

//     const breachData = breachRes.data;
//     const breaches = breachData.ExposedBreaches?.breaches_details;

//     if (!breaches || breaches.length === 0) {
//       return res.status(200).json({ message: "No breaches found." });
//     }

//     // Find user in auth table
//     const user = await prisma.auth.findUnique({
//       where: { email },
//     });

//     const existingBreaches = await prisma.exposedData.findMany({
//       where: { userId: user.id },
//     });

//     if (existingBreaches.length !== breaches.length) {
//       // Iterate breaches and save
//       for (const breach of breaches) {
//         await prisma.exposedData.create({
//           data: {
//             site: breach.breach || null,
//             description: breach.details || null,
//             domain: breach.domain || null,
//             industry: breach.industry || null,
//             logo: breach.logo || null,
//             passwordRisk: breach.password_risk || null,
//             references: breach.references || null,
//             searchable: breach.searchable || null,
//             verified: breach.verified || null,
//             xposedData: breach.xposed_data || null,
//             xposedDate: breach.xposed_date || null,
//             xposedRecords: breach.xposed_records || null,
//             userId: user.id,
//           },
//         });
//       }
//       console.log(existingBreaches.length, breaches.length);

//       // Send ExposedBreaches response
//       return res.status(200).json(breachData.ExposedBreaches);
//     }

//     return res.status(200).json(breaches);
//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     return res.status(500).json({ error: "Something went wrong" });
//   }
// };

export const checkbreach = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Call XposedOrNot API
    const breachRes = await axios.get(
      `https://api.xposedornot.com/v1/breach-analytics?email=${email}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          Accept: "application/json",
        },
      }
    );

    const breachData = breachRes.data;
    const breaches = breachData.ExposedBreaches?.breaches_details;

    if (!breaches || breaches.length === 0) {
      return res.status(200).json({ message: "No breaches found." });
    }

    // Find user in auth table
    const user = await prisma.auth.findUnique({
      where: { email },
    });

    if (!user) {
      return res
        .status(200)
        .json({ message: "Random user found", data: breaches });
    }

    const existingBreaches = await prisma.exposedData.findMany({
      where: { userId: user.id },
    });

    if (existingBreaches.length === breaches.length) {
      // ✔ Lengths equal, return existing data
      return res
        .status(200)
        .json({ message: "No change", data: existingBreaches });
    } else {
      // 🔴 Lengths differ, delete existing and insert new breaches
      await prisma.exposedData.deleteMany({
        where: { userId: user.id },
      });

      await prisma.exposedData.createMany({
        data: breaches.map((breach) => ({
          site: breach.breach || null,
          description: breach.details || null,
          domain: breach.domain || null,
          industry: breach.industry || null,
          logo: breach.logo || null,
          passwordRisk: breach.password_risk || null,
          references: breach.references || null,
          searchable: breach.searchable || null,
          verified: breach.verified || null,
          xposedData: breach.xposed_data || null,
          xposedDate: breach.xposed_date || null,
          xposedRecords: breach.xposed_records || null,
          userId: user.id,
        })),
      });

      return res
        .status(200)
        .json({ message: "Breaches updated", data: breaches });
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
