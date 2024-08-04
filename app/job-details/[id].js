import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import React, { useCallback, useState } from 'react'

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import useFetch from '../../hook/useFetch'

export default function JobDetails() {

    const router = useRouter()
    const params = useLocalSearchParams()

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {})

    const { data, isLoading, error } = useFetch('job-details', {
        job_id: params.id
    });
  return (
    <SafeAreaView style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite
    }}>
        <Stack.Screen
        options={
            {
                headerStyle: { backgroundColor: COLORS.lightWhite },
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn
                        iconUrl={icons.left}
                        dimension="60%"
                        onPress={() => router.back()}
                    />
                ),
                headerRight: () => (
                    <ScreenHeaderBtn
                        iconUrl={icons.share}
                        dimension="60%"
                    />
                ),
                headerTitle: ''
            }
        }
        />
        <>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} 
            onRefresh={onRefresh}
            />}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : error ? (
                    <Text>An error occurred</Text>
                ) : data.length === 0 ? (
                    <Text>No data found</Text>
                ): 
                <View style={{
                    padding: SIZES.medium,
                    paddingBottom: 100
                }}>
                    <Company companyLogo={data[0].employer_logo} 
                    JobTitle={data[0].job_title} 
                    companyName={data[0].employer_name}
                    Location={data[0].job_country}/>   
                    <JobTabs job={data.job} />
                    <JobAbout job={data.job} />
                    <JobFooter job={data.job} />

                </View>
                }
            </ScrollView>
        </>
      <Text>Job Details</Text>
    </SafeAreaView>
  )
}