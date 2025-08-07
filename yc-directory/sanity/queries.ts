export const STARTUP_QUERY = `*[_type == "startup" && defined(slug.current)] {
  _createdAt,
  views,
  author -> {_id, name, image},
  _id,
  description,
  image,
  category,
  title,
}`;
