import express, { Request, Response } from 'express';
import VisitorModel, { Visitor } from '../models/visitor';
import cors from 'cors';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phoneNumber, visitDate} = req.body;// Menggunakan 'new' untuk membuat instance baru

    const newVisitor: Visitor = new VisitorModel({
      name,
      email,
      phoneNumber,
      visitDate,
    });
  
      const savedVisitor = await newVisitor.save();
  
      res.status(201).json(savedVisitor);
    } catch (error) {
      res.status(500).json({ message: 'Terjadi kesalahan saat membuat Visitor baru.', error: error.message });
    }
  });
  router.get('/', cors(), async (req: Request, res: Response) => {
    try {
      const visitors = await VisitorModel.find();
      res.json(visitors);
    } catch (error) {
      res.status(500).json({ message: 'Terjadi kesalahan saat mengambil daftar Visitor.', error: error.message });
    }
  });
  router.get('/:id', async (req: Request, res: Response) => {
    try {
      const visitor = await VisitorModel.findById(req.params.id);
      if (!visitor) {
        return res.status(404).json({ message: 'Visitor tidak ditemukan.' });
      }
      res.json(visitor);
    } catch (error) {
      res.status(500).json({ message: 'Terjadi kesalahan saat mengambil Visitor.', error: error.message });
    }
  });
//   router.get('/owner/:ownerId/:page/:limit', async (req: Request, res: Response) => {
//     try {
//       const ownerId = req.params.ownerId;
//       const page = parseInt(req.params.page) || 1; // Halaman saat ini
//       const limit = parseInt(req.params.limit) || 10; // Jumlah Visitor per halaman
  
//       const skip = (page - 1) * limit;
  
//       const countPromise = ProductModel.countDocuments({ owner: ownerId }).exec();
//       const productsPromise = ProductModel.find({ owner: ownerId })
//         .skip(skip)
//         .limit(limit)
//         .exec();
  
//       const [count, products] = await Promise.all([countPromise, productsPromise]);
  
//       const totalPages = Math.ceil(count / limit);
  
//       res.json({
//         page,
//         limit,
//         totalProducts: count,
//         totalPages,
//         products,
//       });
//     } catch (error) {
//       res.status(500).json({ message: 'Terjadi kesalahan saat mengambil Visitor berdasarkan pemilik.', error: error.message });
//     }
//   });
  
  
  router.put('/:id', async (req: Request, res: Response) => { 
    try {
        const { name, email, phoneNumber, visitDate, thumbnails } = req.body;

const updatedVisitor = await VisitorModel.findByIdAndUpdate(
  req.params.id,
  { name, email, phoneNumber, visitDate },
  { new: true }
);

if (!updatedVisitor) {
  return res.status(404).json({ message: 'Visitor tidak ditemukan.' });
}

res.json(updatedVisitor);
} catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui Visitor.', error: error.message });
  }
});
router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const deletedVisitor = await VisitorModel.findByIdAndRemove(req.params.id);
  
      if (!deletedVisitor) {
        return res.status(404).json({ message: 'Visitor tidak ditemukan.' });
      }
  
      res.json({ message: 'Visitor berhasil dihapus.' });
    } catch (error) {
      res.status(500).json({ message: 'Terjadi kesalahan saat menghapus Visitor.', error: error.message });
    }
  });
  export default router ;