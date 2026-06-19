import userModel from "../models/userModel.js"


//add products to user cart 
const addTocart = async (req, res) => {
    try {
        const { userId, itemid, size } = req.body
        const userData = await userModel.findById(userId)
        const cartData = await userData.cartData

        if (cartData[itemid]) {
            if (cartData[itemid][size]) {
                cartData[itemid][size] += 1
            } else {
                cartData[itemid][size] = 1
            }
        } else {
            cartData[itemid] = { [size]: 1 }
        }
        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: "Item added to cart" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }

}

const updateCart = async (req, res) => {
    try {
        const { userId, itemid, size, quantity } = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        
        if (!cartData[itemid]) {
            cartData[itemid] = {}
        }
        
        cartData[itemid][size] = quantity
        
        if (cartData[itemid][size] <= 0) {
            delete cartData[itemid][size]
        }
        
        if (Object.keys(cartData[itemid]).length === 0) {
            delete cartData[itemid]
        }
        
        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: "Cart Updated" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
}
const getusercart = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        res.json({ success: true, cartData })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }

}

export { addTocart, updateCart, getusercart }