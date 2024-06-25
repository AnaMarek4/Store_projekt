using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Npgsql;
using Store.Model;
using Store.Service.Common;
using Store.Common;
using DTO.ProductModel;

namespace Store.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public ProductController(IProductService productService, IMapper mapper)
        {
            _productService = productService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> AddProductAsync([FromBody] ProductPost productPost)
        {
            try
            {
                var product = _mapper.Map<Product>(productPost);
                product.Id = Guid.NewGuid();
                product.IsActive = true;
                product.DateCreated = DateTime.UtcNow;
                product.DateUpdated = DateTime.UtcNow;
                product.CreatedByUserId = product.CreatedByUserId;
                product.UpdatedByUserId = product.CreatedByUserId;

                await _productService.AddProductAsync(product);

                return Ok("Product added");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetFilteredProductsAsync(Guid? productId, Guid? categoryId, string sortBy = "Price", string sortOrder = "DESC", int pageNumber = 1, int pageSize = 4)
        {
            try
            {
                var filtering = new ProductFiltering
                {
                    ProductId = productId,
                    CategoryId = categoryId
                };

                var sorting = new ProductSorting
                {
                    SortBy = sortBy,
                    SortOrder = sortOrder
                };

                var paging = new ProductPaging
                {
                    PageNumber = pageNumber,
                    PageSize = pageSize
                };

                var products = await _productService.GetFilteredProductsAsync(filtering, sorting, paging);

                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProductAsync(Guid id, [FromBody] ProductPut productPut)
        {
            try
            {
                var product = _mapper.Map<Product>(productPut);
                await _productService.UpdateProductAsync(product);

                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductAsync(Guid id)
        {
            try
            {
                await _productService.DeleteProductAsync(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
