import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tournament, getTournamentStatus, TournamentStatus } from '@/models/tournament';
import { getTournaments } from '@/services/tournamentDB';
import { Link } from 'expo-router';
import { ContentContainer } from '../ContentContainer';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { NeutralColors } from '@/constants/Colors';
interface ListProps {
    tournamentList: Tournament[];
}
interface statusColors{
    text: string;
    bg: string;
}
export const TournamentListView = ({tournamentList}: ListProps) => {
    const iconColor = useThemeColor({ light: NeutralColors[50], dark: NeutralColors[900] }, 'text');
    const getStatusColors = (status: TournamentStatus):statusColors => {
        switch (status) {
            case TournamentStatus.PENDING:
                return {text: 'text-yellow-500', bg: 'bg-yellow-300'};
            case TournamentStatus.ACTIVE:
                return {text: 'text-teal-500', bg: 'bg-blue-300'};
            case TournamentStatus.COMPLETED:
                return  {text: 'text-red-500', bg: 'bg-green-300'};
            default:
                return {text: 'text-neutral-700', bg: 'bg-neutral-300'};
        }
    }
   
  return (
    <>
    {tournamentList && tournamentList.length > 0 && (
        
            <View className='pt-4'>

            {tournamentList.map((t, index) => (
                <ContentContainer key={index} classes={`pt-4 pb-4 ${
                    (index + 1) === tournamentList.length ? '' : 'border-b border-neutral-300 dark:border-neutral-700'
                } `}>
                    <View className='flex-row justify-between'>
                    
                        <View>
                            <View className=' pb-1 mb-1'>
                            <Text className='text-neutral-900 dark:text-neutral-100 text-lg font-bold'>{t.name}</Text>

                            </View>
                            <Text className='text-neutral-700 dark:text-neutral-300 text-sm font-bold'>Format : {t.format === 0 ? 'Knockout' : 'Qualifiers'}</Text>


                            <Text className={`text-neutral-700 text-xs font-bold ${getStatusColors(t.status).text}`}>{getTournamentStatus(t.status as TournamentStatus)}</Text>
                            
                            
                        </View>
                        <View className='justify-end'>

                        <Link href={`/(tabs)/play/${t.id}`}>
                        <View className='flex-row items-center px-4 py-2 bg-neutral-700 dark:bg-neutral-200 rounded-md'>

                            <Text className='text-neutral-100 dark:text-neutral-800 pr-1'>View</Text>
                            <Ionicons name='eye' size={20} color={iconColor} />
                        </View>
                        </Link>
                        </View>
                    </View>
                </ContentContainer>
            ))}
            </View>
        
    )}
    </>
  )
}

