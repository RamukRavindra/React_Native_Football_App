import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getFootBallData } from '../api/Api';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TrophyIcon, CalendarIcon, FlagIcon } from 'react-native-heroicons/solid';


const Dashboard = () => {
    const [footBallData, setFootBallData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10);

    useEffect(() => {
        getAllFootBallData();
    }, []);

    const getAllFootBallData = async () => {
        try {
            const response = await getFootBallData();
            const data = response.response?.competitions || [];
            setAllData(data);
            setFootBallData(data.slice(0, 10));
        } catch (error) {
            console.log('error', error.message);
        }
    };

    const loadMoreData = () => {
        if (visibleCount >= allData.length) return;
        setTimeout(() => {
            const newCount = visibleCount + 10;
            setFootBallData(allData.slice(0, newCount));
            setVisibleCount(newCount);
        }, 2000);
    };


    const renderItem = ({ item }) => {
        return (
            <View style={styles.cardContainer}>
                <View style={styles.cardHeader}>
                    <View style={styles.iconRow}>
                        <FlagIcon color="#3399CC" size={20} />
                        <Text style={styles.areaText}>{item.area?.name}</Text>
                    </View>
                    <View style={styles.iconRow}>
                        <TrophyIcon color="#F5C518" size={20} />
                        <Text style={styles.titleText}>{item.name}</Text>
                    </View>
                </View>

                <View style={styles.cardBody}>
                    <Text style={styles.bodyText}>{item.type}</Text>
                    <Text style={styles.bodyText}>
                        {item.numberOfAvailableSeasons} {item.numberOfAvailableSeasons === 1 ? 'Season' : 'Seasons'}
                    </Text>

                </View>

                <View style={styles.dateRow}>
                    <CalendarIcon color="#4B0082" size={16} />
                    <Text style={styles.dateText}>{item.currentSeason?.startDate} - {item.currentSeason?.endDate}</Text>
                </View>
            </View>

        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#FAf9F6' }}>
            {allData && allData.length > 0 ? (
                <FlatList
                    data={footBallData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: hp(10) }}
                    onEndReached={loadMoreData}
                    onEndReachedThreshold={0.1}
                    initialNumToRender={10}
                    onRefresh={() => getAllFootBallData()}
                    refreshing={false}
                    ListFooterComponent={() => (
                        footBallData.length < allData.length ? (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
                                <ActivityIndicator size='large' color="#009999" />
                                <Text style={{ textAlign: 'center', padding: 10 }}>Please wait...</Text>
                            </View>
                        ) : null
                    )}
                    ListFooterComponentStyle={{ marginBottom: hp(5), paddingVertical: hp(5) }}
                />
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color="#009999" />
                </View>
            )}

        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginTop: hp(1.0),
        marginHorizontal: wp(4),
        padding: hp(2),
        borderRadius: hp(1.2),
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(1),
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(1),
    },
    areaText: {
        fontSize: hp(1.7),
        color: '#009999',
        fontWeight: '600',
    },
    titleText: {
        fontSize: hp(1.7),
        color: '#333',
        fontWeight: '600',
    },
    bodyText: {
        fontSize: hp(1.6),
        color: '#555',
        fontWeight: 'bold'
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 4,
        marginHorizontal: hp(0.5)
    },
    dateText: {
        fontSize: hp(1.5),
        color: '#888',
        fontStyle: 'italic',
        fontWeight: '700'
    },
});

