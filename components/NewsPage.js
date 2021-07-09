import React, {useEffect} from 'react';
import {useState} from "react";
import {
    AspectRatio,
    Box,
    Center, Collapse, Divider, Fade,
    Flex,
    Heading,
    HStack,
    Image,
    ScrollView, Slide, SlideFade,
    Spacer,
    Spinner,
    Text,
    VStack
} from "native-base";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {useTheme} from "@react-navigation/native";
import Header from "./Header";
import NewsStagger from "./NewsStagger";
import {Linking, Share, TouchableOpacity} from "react-native";
import {Searchbar} from "react-native-paper";
import {ShakeEvent} from "../utils/ShakeEvent";
import * as Haptics from "expo-haptics";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {rgbaColor} from "react-native-reanimated/src/reanimated2/Colors";
import {apikey} from "../utils/api-keys";


const counter = [3,3,3];


export default function NewsPage(){

    const theme = useTheme();

    const [news, setNews] = useState();
    const [loaded, isLoaded] = useState(false);
    const [error, hasError] = useState(false);
    const [fade, setFade] = useState(false)
    const [subscription, setSubscription] = useState(null);
    const [searchFade, setSearchFade] = useState(false);
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0
    });

    const [open, setOpen] = useState(false);

    const [category, setCategory] = useState("General")
    const [searchQuery, setSearchQuery] = useState("");


    const onShare = async (title,url) => {
        try{
            const result = await Share.share({
                message: title,
                url: url
            })
            if(result.action === Share.sharedAction){
                if(result.activityType){
                    console.log("shared activity Type")
                }
                else{
                    console.log("shared")
                }
            }
            else if(result.action === Share.dismissedAction){
                console.log("dismissed")
            }
        } catch (error){
            alert(error.message)
        }

    }

    useEffect(() => {
        ShakeEvent.addListener(() => {
            setFade(false)
            fetchNews(category.toLowerCase());
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        })
    })

    useEffect(() => {
        fetchNews(category).then(() => {
            isLoaded(true);
        }).catch(() => {
            hasError(true)
        });
    },[])

    async function fetchNews(category, query){
        // https://newsapi.org/v2/top-headlines?country=ch&category=general&apiKey=c79884f0c42e4b51b7ea042b0f3d0976
        let response;
        !query ? response = await fetch(`https://newsapi.org/v2/top-headlines?country=ch&category=${category}&apiKey=${apikey.news}`)
            : response = await fetch(`https://newsapi.org/v2/top-headlines?q=${query}&apiKey=${apikey.news}`)
        const json = response.json();
        json.then((response) => {
            if(response.status !== 'error'){
                setCategory(category.charAt(0).toUpperCase() + category.slice(1));
                setNews(response)
                setFade(true)
            }
            else{
                hasError(true)
            }

        }).catch((error) => {
            hasError(true)
        })
    }



    return(
        <NativeBaseProvider>
            <HStack top={10} height={'17%'} >
                <Header name={"News"} subHeader={category} search={true} fade={searchFade} setFade={setSearchFade} />
            </HStack>
            <Fade in={searchFade} position={'absolute'}>
                <Searchbar
                    style={{
                        top: -15,
                        width: '85%',
                        alignSelf: 'center',
                        borderRadius : '25px',
                        opacity: 0.8,
                        position: 'absolute'
                    }}
                    placeholder={"Search"}
                    onChangeText={(query) => setSearchQuery(query)}
                    value={searchQuery}
                    onIconPress={() => fetchNews("",searchQuery)}
                />
            </Fade>
            <Collapse
                height={50}
                isOpen={searchFade}
            />
            <Fade in={fade}>
                <ScrollView>
                    {
                        !error && loaded && news ? (
                            <Box
                                justifyContent={'center'}
                                alignSelf={'center'}
                                alignItems={'center'}
                                width={'100%'}
                            >
                                <VStack
                                    space={5}
                                    width={'100%'}
                                    mt={5}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                >
                                    {
                                        loaded && (
                                            news.articles.map((article) => (

                                                    <Box
                                                        bgColor={theme.colors.newsCard}
                                                        shadow={4}
                                                        rounded={'lg'}
                                                        w={'85%'}
                                                        height={400}
                                                        position={'relative'}
                                                    >

                                                        <AspectRatio width={'100%'} height={'50%'} ratio={1.76} >
                                                            <Image width={'100%'} source={{ uri : article.urlToImage }} alt={"asdas"} />
                                                        </AspectRatio>
                                                        <Heading padding={2} size={'sm'} color={theme.colors.newsCardText} >{article.title}</Heading>
                                                        <ScrollView>
                                                            <Text padding={2} color={theme.colors.newsCardText}>{article.description}</Text>
                                                        </ScrollView>
                                                        <TouchableOpacity
                                                            onPress={() => onShare(article.title,article.url)}
                                                        >
                                                            <Box
                                                                p={2}
                                                                width={10}
                                                                position={'absolute'}
                                                                bottom={3}
                                                                style={{
                                                                    backdropFilter: 'blur(5px)'
                                                                }}
                                                                right={3}
                                                                bgColor={rgbaColor(255,255,255,0.1)}
                                                                rounded={"full"}
                                                            >
                                                                <MaterialCommunityIcons name={"share"} color={'#90ee90'} size={24} />
                                                            </Box>
                                                        </TouchableOpacity>
                                                    </Box>

                                            ))
                                        )
                                    }
                                </VStack>
                            </Box>
                        ) : (
                            <Spinner accessibilityLabel={"loading"} />
                        )
                    }
                </ScrollView>
            </Fade>
            <NewsStagger open={open} setOpen={() => {
                setOpen(!open)
            }} fetch={fetchNews} setFade={setFade} />
        </NativeBaseProvider>
    )
}
