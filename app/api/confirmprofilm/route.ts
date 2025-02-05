import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { title, firstname, lastname, email, phoneNumber, contactInfo, address, profileImage } = req.body;

      const newUser = await prisma.profile.create({
        data: {
          title,
          firstname,
          lastname,
          email,
          phoneNumber,
          contactInfo,
          address,
          profileImage, // Store image URL or base64 here depending on how you're handling it
          createdAt: new Date(),
        },
      });

      return res.status(200).json({ message: 'Profile saved!', user: newUser });
    } catch (error) {
      return res.status(500).json({ error: 'Database error', details: error });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
