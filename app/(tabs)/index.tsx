import { View } from 'react-native'
import React, { useEffect } from 'react'
import { CarouselScreen } from '@/components/carousel/CarouselScreen'
import { useUsers } from '@/components/UserContextProvider' 
import { User } from '@/models/tournament'
import { CarouselData } from '@/components/carousel/CarouselScreen'

const index = () => {

  const { users } = useUsers()
  const [carouselData, setCarouselData] = React.useState<CarouselData[]>([])
  
  useEffect(() => {
    handleCarouselData()
  }, [users])

  const handleCarouselData =  () =>{ 
    if(users.length === 0) return
      
    let data: CarouselData[] = []

    const userWithMostWins: User = users.reduce((prev, current) =>
      (prev.wins! > current.wins!) ? prev : current
    )
    const userWithHighestID: User = users.reduce((prev, current) =>
      (prev.id > current.id) ? prev : current
    )
    const userWithLowestID: User = users.reduce((prev, current) =>
      (prev.id < current.id) ? prev : current
    )
    data.push({user: userWithMostWins, title: 'Most Wins', subtitle: `${userWithMostWins.wins} wins total`})
    data.push({user: userWithHighestID, title: 'Newest User', subtitle: `Welcome!`})
    data.push({user: userWithLowestID, title: 'Oldest User', subtitle: `A real OG!`})

    setCarouselData(data)
  }

  return (
    <View className='bg-neutral-50 dark:bg-neutral-950 flex-1'>
      <CarouselScreen carouselData={carouselData} />
     
    </View>
  )
}

export default index