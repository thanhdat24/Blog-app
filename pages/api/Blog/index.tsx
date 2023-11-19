import type { NextApiRequest, NextApiResponse } from "next";

export const getBlog = async () => {
  const res = await fetch(
    "https://q-force-wiki.hotanloc.xyz/flows/trigger/1cf2db70-b0cc-4deb-9563-29eadcc59108",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("res", res);
  return res.json();
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const data = await getBlog();
    console.log("data", data);
    res.status(200).json({ blogs: data });
  } else {
    res.status(400).json({ error: "name and industry are required." });
  }
};
