export type Product = {
  id: number;
  name: string;
  attributes: Attribute[];
};

export type Attribute = AttributeTemplate &
  (ColorAttribute | SizeAttribute | WeightAttribute);

export type AttributePayload = Partial<
  AttributeTemplate & ColorAttribute & SizeAttribute & WeightAttribute
>;

type AttributeTemplate = {
  code: string;
  name: string;
};

type Size = {
  width: number;
  height: number;
};

type ColorAttribute = {
  color: string;
};

type SizeAttribute = {
  size: Size;
};

type WeightAttribute = {
  weight: number;
};
