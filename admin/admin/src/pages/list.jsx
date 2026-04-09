import React from 'react'

const products = [
  { name: 'Premium Cotton Tee', category: 'Men', price: '$49', stock: 'In stock' },
  { name: 'Relaxed Linen Shirt', category: 'Women', price: '$59', stock: 'Low stock' },
  { name: 'Runner Sneakers', category: 'Unisex', price: '$89', stock: 'In stock' },
]

const List = () => {
  return (
    <section className='space-y-6'>
      <div>
        <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>Catalog</p>
        <h1 className='mt-2 text-3xl font-semibold text-slate-900'>Product List</h1>
        <p className='mt-2 max-w-2xl text-sm text-slate-600'>Review the current catalog and prepare items for updates or removal.</p>
      </div>

      <div className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm'>
        <div className='grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-600'>
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Status</span>
        </div>

        {products.map((product) => (
          <div key={product.name} className='grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-6 py-4 text-sm text-slate-700 odd:bg-white even:bg-slate-50/60'>
            <span className='font-medium text-slate-900'>{product.name}</span>
            <span>{product.category}</span>
            <span>{product.price}</span>
            <span>{product.stock}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default List
