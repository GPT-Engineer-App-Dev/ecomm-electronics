import { Box, Container, Flex, Heading, HStack, Image, SimpleGrid, Text, VStack, Input, Select, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Smartphone",
    description: "Latest model with advanced features",
    image: "https://via.placeholder.com/150",
    price: 699,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Laptop",
    description: "High performance, lightweight",
    image: "https://via.placeholder.com/150",
    price: 999,
    category: "Electronics",
  },
  {
    id: 3,
    name: "Tablet",
    description: "Large screen, fast processor",
    image: "https://via.placeholder.com/150",
    price: 499,
    category: "Electronics",
  },
  {
    id: 4,
    name: "T-shirt",
    description: "100% cotton, available in multiple colors",
    image: "https://via.placeholder.com/150",
    price: 19.99,
    category: "Clothing",
  },
  {
    id: 5,
    name: "Jeans",
    description: "Slim fit, high quality denim",
    image: "https://via.placeholder.com/150",
    price: 39.99,
    category: "Clothing",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
    );
  });

  return (
    <Container maxW="container.xl" p={0}>
      <Flex as="nav" bg="blue.500" color="white" p={4} justifyContent="space-between" alignItems="center">
        <Heading size="lg">ElectroShop</Heading>
        <HStack spacing={8}>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact</Link>
        </HStack>
      </Flex>

      <Box as="main" p={4}>
        <VStack spacing={8} mb={8}>
          <Heading>Welcome to ElectroShop</Heading>
          <Text fontSize="lg">Your one-stop shop for the latest electronics and clothing.</Text>
          <Input
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        <Select placeholder="Select category" onChange={handleCategoryChange}>
            <option value="All">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
          </Select>
          <Box width="100%">
            <Text mb={2}>Price Range: ${priceRange[0]} - ${priceRange[1]}</Text>
            <Slider
              min={0}
              max={1000}
              step={10}
              defaultValue={[0, 1000]}
              onChangeEnd={handlePriceChange}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6} index={0} />
              <SliderThumb boxSize={6} index={1} />
            </Slider>
          </Box>
        </VStack>

        <Heading size="md" mb={4}>Featured Products</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {filteredProducts.map((product) => (
            <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={product.image} alt={product.name} />
              <Box p={4}>
                <Heading size="md" mb={2}>{product.name}</Heading>
                <Text mb={2}>{product.description}</Text>
                <Text fontWeight="bold">${product.price}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default Index;