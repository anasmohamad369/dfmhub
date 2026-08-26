// Domain Layer
export * from "./domain/entities/product.entity";
export * from "./domain/validation/product.schema";

// Infrastructure Layer
export * from "./infrastructure/repositories/product.repository";

// Application Layer
export * from "./application/use-cases/useProductQueries";

// Presentation Layer
export { default as ProductTypeSelector } from "./presentation/components/ProductTypeSelector";
export { default as ProductCatalogCard } from "./presentation/components/ProductCatalogCard";
export { default as ProductCatalogClient } from "./presentation/components/ProductCatalogClient";
