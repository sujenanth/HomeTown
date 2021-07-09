import {
    Box,
    Center,
    Collapse,
    Container,
    Fade,
    Heading,
    HStack,
    Slide,
    SlideFade,
    Spinner,
    Text,
    VStack
} from "native-base";
import React, {useEffect, useState} from "react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import Header from "./Header";
import HomeScreen from "./HomeScreen";
import FlipCard from "react-native-flip-card";
import {TouchableOpacity, View} from "react-native";
import CardFlip from 'react-native-card-flip';
import {weatherTheme} from "../utils/Weather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {ShakeEvent} from "../utils/ShakeEvent";
import {useTheme} from "@react-navigation/native";
import {Searchbar} from "react-native-paper";

export default function WeatherApp(React$Node){

    const [flip, setFlip] = useState(false);
    const [card, setCard] = useState();
    const [weather, setWeather] = useState();
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const [fade, setFade] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");

    const [searchOpen, setSearchOpen] = useState();

    const [location, setLocation] = useState("Zuerich")

    const theme = useTheme();

    const unknown = 0;
    const Clear = 1000;
    const Cloudy = [1001,1100,1101,1102];
    const Drizzle = 4000;



    async function fetchWeather(searchLocation){
        setFade(false)
        let search = searchLocation ? searchLocation : location
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&APPID=a77f3f987f76c8f12f714f77f0975885`)
        const json = response.json();
        json
            .then((weather) => {
                if(weather.cod !== '404'){
                    setError(false)
                    setWeather(weather)
                    console.log("test")
                    setLoaded(true)
                }
                else{
                    setError(true)
                }
            })
            .catch((error) => {

            })
    }

    useEffect(() => {
        fetchWeather().then(() => {
            setFade(true)
        });
    },[])

    return(
        <NativeBaseProvider>
            <HStack top={10} height={'17%'}>
                <Header name={"Weather"} subHeader={loaded ? weather.name : null} search={true} fade={searchOpen} setFade={setSearchOpen} />
            </HStack>
            <Fade in={searchOpen}>
                <Box
                    alignSelf={'center'}
                    w={'85%'}
                    position={'relative'}
                >
                    <Searchbar
                        placeholder={"Search"}
                        onChangeText={(query) => setSearchQuery(query)}
                        value={searchQuery}
                        onIconPress={() => {
                            fetchWeather(searchQuery).then(() => setFade(true))
                        }}

                    />
                </Box>
            </Fade>
            <Collapse
                height={30}
                isOpen={searchOpen}
            />
            {
                !error && loaded ?
                    <VStack padding={7}>
                        <CardFlip style={{ height: '95%'}} onFlip={() => console.log("test")} ref={(card) => setCard(card)}>
                            <TouchableOpacity
                                onPress={() => {
                                    card.flip();
                                }}
                            >
                                <Fade in={fade}>
                                    <Box
                                        textColor={'white'}
                                        bgColor={weatherTheme[weather.weather[0].main].color}
                                        p={10}
                                        height={'95%'}
                                        shadow={8}
                                        rounded={'lg'}
                                        position={'relative'}
                                        width={'100%'}
                                    >
                                        <HStack justifyContent={'space-between'} space={70}>
                                            <MaterialCommunityIcons name={
                                                weatherTheme[weather.weather[0].main].icon
                                            } color={'white'} size={100} />
                                            <Heading color={'white'} size={'4xl'}>
                                                {Math.round(weather.main.temp) + '\u00B0'}
                                            </Heading>
                                        </HStack>
                                        <VStack
                                            position={'absolute'}
                                            bottom={0}
                                            padding={10}
                                            width={'100%'}
                                        >
                                            <Heading size={'3xl'} shadow={8} color={'white'}>{weatherTheme[weather.weather[0].main].title}</Heading>
                                            <Box width={300} opacity={0.7}>
                                                <Text shadow={8} color={'white'}>{weatherTheme[weather.weather[0].main].subtitle}</Text>
                                            </Box>
                                        </VStack>

                                    </Box>
                                </Fade>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    card.flip()
                                }}
                            >
                                <Box
                                    bgColor={'grey'}
                                    p={6}
                                    height={'95%'}
                                    shadow={8}
                                    rounded={'lg'}
                                >
                                    <Center shadow={4} bg={theme.colors.background} height={'100%'}>
                                        <Heading>more to come....</Heading>
                                    </Center>
                                </Box>
                            </TouchableOpacity>
                        </CardFlip>
                    </VStack>
                    : !error && !loaded ?
                    <Spinner accessibilityLabel={"loading"} />
                        :
                    <VStack p={7}>
                        <Fade in={fade}>
                            <VStack
                                textColor={'white'}
                                bgColor={theme.colors.iconSecondary}
                                p={10}
                                height={'90%'}
                                shadow={8}
                                rounded={'lg'}
                                position={'relative'}
                                width={'100%'}
                                justifyContent={'center'}
                                space={6}
                            >
                                <Box justifyContent={'space-between'} space={70}>
                                    <Heading color={theme.colors.iconPrimary}>The city has not been found</Heading>
                                </Box>

                                <Center>
                                    <MaterialCommunityIcons name={"emoticon-sad-outline"} color={theme.colors.iconPrimary} size={50} />
                                </Center>

                            </VStack>
                        </Fade>
                    </VStack>
            }
        </NativeBaseProvider>
    )
}