import { Request, Response } from 'express'
import Product from '../models/Product.model'

export const getProducts = async (req : Request, res : Response) => {
    try {
        const products = await Product.findAll({
            order: [
                ['price', 'DESC']
            ],
            attributes: {exclude: ['updatedAt']}
        })
        return res.json({data: products})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: 'Error al obtener los productos'})
    }
}

export const getProductById = async (req : Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id);
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' })
    }
    return res.json({data: product})
}

export const createProduct = async (req : Request, res : Response) => {
    try {
        const product = await Product.create(req.body)
        return res.status(201).json({msg: 'Producto creado', data: product})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error al crear el producto' })
    }
}

export const updateProduct = async (req : Request, res : Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id);
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' })
    }

    try {
        await product.update(req.body)
        return res.json({msg: 'Producto actualizado', data: product})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error al actualizar el producto' })
    }
}

export const updateAvailability = async(req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    try {
        const current = !!product.get('availability');
        product.set('availability', !current);

        await product.save();
        await product.reload();
        
        return res.json({data: product})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error al actualizar la disponibilidad del producto' })
    }
}

export const deleteProduct = async (req : Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id);
    if (!product) {
        return res.status(404).json({error: 'Producto no encontrado'})
    }

    try {
        product.destroy()
        return res.json({msg: 'Producto eliminado correctamente'})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Hubo un error al eliminar el producto.' })
    }
}