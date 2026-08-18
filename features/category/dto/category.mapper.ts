export function toCategoryDTO(
  category: any
) {
  return {
    id: category._id.toString(),

    name: category.name,

    slug: category.slug,

    description:
      category.description,

    image:
      category.image,

    parent:
      category.parent
        ? category.parent.toString()
        : null,

    sortOrder:
      category.sortOrder,

    showInMenu:
      category.showInMenu,

    featured:
      category.featured,

    seo: category.seo,

    status:
      category.status,

    createdAt:
      category.createdAt,

    updatedAt:
      category.updatedAt,
  };
}

export function toFastrrCollection(
  category: any
) {
  return {
    collection_id: category.fastrrId,

    title: category.name,
    handle: category.slug,

    body_html:
      category.description || "",

    image: category.image
      ? {
          src: category.image,
        }
      : null,

    created_at:
      category.createdAt.toISOString(),

    updated_at:
      category.updatedAt.toISOString(),
  };
}