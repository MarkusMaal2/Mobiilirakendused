import React, {useEffect, useState} from "react";
import {View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

import Header from "../../../components/Header";
import CategoryBox from "../../../components/CategoryBox";
import { categories } from "../../../data/categories";
import { products } from "../../../data/products";
import ProductHomeItem from "../../../components/ProductHomeItem";

const Home = ({navigation}) => {
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedProducts, setSelectedProducts] = useState(products);
    const [keyword, setKeyword] = useState();

    useEffect(() => {
        if (selectedCategory && !keyword) {
            const updatedSelectedProducts = products.filter((product) => 
                product?.category === selectedCategory);
            setSelectedProducts(updatedSelectedProducts);
        } else if (selectedCategory && keyword) {
            const updatedSelectedProducts = products.filter((product) => 
                product?.category === selectedCategory && product?.title?.toLowerCase().includes(keyword.toLowerCase()));
            setSelectedProducts(updatedSelectedProducts);
        } else if (!selectedCategory && keyword) {
            const updatedSelectedProducts = products.filter((product) => 
                product?.title?.toLowerCase().includes(keyword.toLowerCase()));
            setSelectedProducts(updatedSelectedProducts);
        } else if (!keyword && !selectedCategory) {
            setSelectedProducts(products);
        }
    }, [selectedCategory, keyword])

    const renderCategoryItem = ({item}) => {
        return (
            <CategoryBox
                onPress={() => setSelectedCategory(item?.id)}
                isSelected={item.id === selectedCategory}
                title={item?.title}
                image={item?.image}
            />
        )
    }

    const renderProductItem = ({item}) => {
        const onProductPress = (product) => {
            navigation.navigate("ProductDetails", {product})
        }
        console.log('item => ', item);
        return (
            <ProductHomeItem {...item} onPress={() => onProductPress(item)}></ProductHomeItem>
        )
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Header showSearch={true} title="Find All You Need" onSearchKeyword={setKeyword} keyword={keyword} />
                <FlatList showsHorizontalScrollIndicator={false} style={styles.list} horizontal data={categories} renderItem={renderCategoryItem} keyExtractor={(item, index) => {String(index)}}></FlatList>
                <FlatList data={selectedProducts} renderItem={renderProductItem} keyExtractor={(item) => String(item.id)} numColumns={2} ListFooterComponent={<View style={{height: 250}}/>}></FlatList>
            </View>
        </SafeAreaView>
    )
}

export default Home;