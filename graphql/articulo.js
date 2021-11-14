// GRAPHQL TYPE Articulo
const articulo = `
type Image {
  url: String!
  size: Int!
  width: Int!
  height: Int!
  description: String
}
type ContentImage {
  name: String!
  type: String!
  value: [Image]
}

type Content {
  name: String!
  type: String!
  value: String!
}
type Articulo {
  category: String
  articulo_imagen: ContentImage
  articulo_titular: Content
  articulo_cuerpo: Content
}
`;

module.exports = { articulo };
