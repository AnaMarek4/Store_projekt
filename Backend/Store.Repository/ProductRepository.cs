using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Text;
using Npgsql;
using Store.Model;
using Store.Common;
using Store.Repository.Common;
using DTO.ProductModel;

namespace Store.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly string _connectionString;

        public ProductRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task AddProductAsync(Product product)
        {
            await using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();

            try
            {
                var addProductCommandText = @"
                    INSERT INTO ""Product"" 
                    (""Id"", ""Name"", ""Price"", ""CategoryId"", ""IsActive"", ""DateCreated"", ""DateUpdated"", 
                     ""CreatedByUserId"", ""UpdatedByUserId"")
                    VALUES 
                    (@Id, @Name, @Price, @CategoryId, @IsActive, @DateCreated, @DateUpdated, 
                     @CreatedByUserId, @UpdatedByUserId)";

                await using var addProductCommand = new NpgsqlCommand(addProductCommandText, connection);
                addProductCommand.Parameters.AddWithValue("@Id", product.Id);
                addProductCommand.Parameters.AddWithValue("@Name", product.Name);
                addProductCommand.Parameters.AddWithValue("@Price", product.Price);
                addProductCommand.Parameters.AddWithValue("@CategoryId", product.CategoryId);
                addProductCommand.Parameters.AddWithValue("@IsActive", product.IsActive);
                addProductCommand.Parameters.AddWithValue("@DateCreated", product.DateCreated);
                addProductCommand.Parameters.AddWithValue("@DateUpdated", product.DateUpdated);
                addProductCommand.Parameters.AddWithValue("@CreatedByUserId", product.CreatedByUserId);
                addProductCommand.Parameters.AddWithValue("@UpdatedByUserId", product.UpdatedByUserId);

                await addProductCommand.ExecuteNonQueryAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error adding product", ex);
            }
        }

        public async Task<ProductGet> GetProductByIdAsync(Guid id)
        {
            var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();

            var commandText = @"
                            SELECT 
                                p.*, 
                                c.""Name"" AS ""Category"",
                            FROM ""Product"" p
                            LEFT JOIN ""Category"" c ON p.""CategoryId"" = c.""Id""
                            WHERE p.""Id"" = @Id
                            GROUP BY p.""Id"", c.""Name"" ";

            var command = new NpgsqlCommand(commandText, connection);
            command.Parameters.AddWithValue("Id", id);

            var reader = await command.ExecuteReaderAsync();

            ProductGet product = null;

            if (await reader.ReadAsync())
            {
                product = new ProductGet
                {
                    ProductId = reader.GetGuid(reader.GetOrdinal("Id")),
                    Name = reader.GetString(reader.GetOrdinal("Name")),
                    Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                    CategoryId = reader.GetGuid(reader.GetOrdinal("CategoryId")),
                };
            }

            connection.Close();

            return product;
        }

        public async Task<IEnumerable<ProductGet>> GetFilteredProductsAsync(ProductFiltering filtering, ProductSorting sorting, ProductPaging paging)
        {
            var queryBuilder = new StringBuilder(@"SELECT p.*, c.""Name"" AS ""Category"",
                                                    FROM ""Product"" p
                                                    LEFT JOIN ""Category"" c ON p.""CategoryId"" = c.""Id""
                                                    WHERE 1=1");

            if (filtering.ProductId != null)
            {
                queryBuilder.Append(" AND p.\"Id\" = @ProductId");
            }

            if (filtering.CategoryId != null)
            {
                queryBuilder.Append(" AND p.\"CategoryId\" = @CategoryId");
            }

            queryBuilder.Append(" GROUP BY p.\"Id\", p.\"Name\", p.\"Price\", p.\"CategoryId\", c.\"Name\" ");

            queryBuilder.Append($" ORDER BY \"{sorting.SortBy}\" {sorting.SortOrder}");

            queryBuilder.Append($" OFFSET {paging.PageSize * (paging.PageNumber - 1)} LIMIT {paging.PageSize};");

            await using var connection = new NpgsqlConnection(_connectionString);
            var products = new List<ProductGet>();

            await connection.OpenAsync();
            await using var command = new NpgsqlCommand(queryBuilder.ToString(), connection);

            if (filtering.ProductId != null)
            {
                command.Parameters.AddWithValue("@ProductId", filtering.ProductId);
            }

            if (filtering.CategoryId != null)
            {
                command.Parameters.AddWithValue("@CategoryId", filtering.CategoryId);
            }

            await using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                var product = new ProductGet
                {
                    ProductId = reader.GetGuid(reader.GetOrdinal("Id")),
                    Name = reader.GetString(reader.GetOrdinal("Name")),
                    Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                    CategoryId = reader.GetGuid(reader.GetOrdinal("CategoryId"))
                };

                products.Add(product);
            }
            return products;
        }

        public async Task UpdateProductAsync(Product product)
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                var commandText = @"UPDATE ""Product"" SET ""Name"" = @Name, ""Price"" = @Price, ""CategoryId"" = @CategoryId, ""IsActive"" = @IsActive, ""DateUpdated"" = @DateUpdated, ""UpdatedByUserId"" = @UpdatedByUserId 
                                    WHERE ""Id"" = @Id";
                using (var command = new NpgsqlCommand(commandText, connection))
                {
                    command.Parameters.AddWithValue("@Id", product.Id);
                    command.Parameters.AddWithValue("@Name", product.Name);
                    command.Parameters.AddWithValue("@Price", product.Price);
                    command.Parameters.AddWithValue("@CategoryId", product.CategoryId);
                    command.Parameters.AddWithValue("@IsActive", product.IsActive);
                    command.Parameters.AddWithValue("@DateUpdated", product.DateUpdated);
                    command.Parameters.AddWithValue("@UpdatedByUserId", product.UpdatedByUserId);

                    Console.WriteLine("Executing SQL: " + command.CommandText);
                    foreach (NpgsqlParameter param in command.Parameters)
                    {
                        Console.WriteLine($"{param.ParameterName}: {param.Value}");
                    }

                    int rowsAffected = await command.ExecuteNonQueryAsync();
                    Console.WriteLine("Rows affected: " + rowsAffected);

                    if (rowsAffected == 0)
                    {
                        Console.WriteLine("No rows were updated. Check if the ID is correct.");
                    }

                    await command.ExecuteNonQueryAsync();
                }
            }
        }

        public async Task DeleteProductAsync(Guid id)
        {
            var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();

            var deleteProductCommandText = @"DELETE FROM ""Product"" WHERE ""Id"" = @Id";
            var deleteProductCommand = new NpgsqlCommand(deleteProductCommandText, connection);
            deleteProductCommand.Parameters.AddWithValue("@Id", id);
            await deleteProductCommand.ExecuteNonQueryAsync();
        }
    }
}
