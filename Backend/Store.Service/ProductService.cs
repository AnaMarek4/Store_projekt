using System;
using Store.Common;
using Store.Model;
using Store.Repository.Common;
using Store.Service.Common;
using DTO.ProductModel;

namespace Store.Service
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task AddProductAsync(Product product)
        {
            await _productRepository.AddProductAsync(product);
        }

        public async Task<IEnumerable<ProductGet>> GetFilteredProductsAsync(ProductFiltering filtering, ProductSorting sorting, ProductPaging paging)
        {
            return await _productRepository.GetFilteredProductsAsync(filtering, sorting, paging);
        }

        public async Task UpdateProductAsync(Product product)
        {
            var updatedProduct = new Product();

            updatedProduct.Id = product.Id;
            updatedProduct.Name = product.Name;
            updatedProduct.Price = product.Price;
            updatedProduct.CategoryId = product.CategoryId;
            updatedProduct.DateUpdated = DateTime.UtcNow;
            updatedProduct.UpdatedByUserId = product.UpdatedByUserId;

            await _productRepository.UpdateProductAsync(updatedProduct);
        }

        public async Task DeleteProductAsync(Guid id)
        {
            await _productRepository.DeleteProductAsync(id);
        }
    }
}
