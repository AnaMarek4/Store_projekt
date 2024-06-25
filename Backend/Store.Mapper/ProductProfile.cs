using AutoMapper;
using Store.Model;
using DTO.ProductModel;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Store.Mapper
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<ProductPost, Product>();
            CreateMap<Product, ProductGet>();
            CreateMap<ProductPut, Product>();
        }
    }
}
