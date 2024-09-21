import { Text, View, Image } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { MyCollapsible } from "@/components/MyCollapsible";
import MyParallaxScrollView from "@/components/MyParallaxView";
import { useEffect, useState } from "react";
import { Collapsible } from "@/components/Collapsible";
import  MyModal  from "@/components/MyModal";
import { MyButton } from "@/components/MyButton";

NativeWindStyleSheet.setOutput({
  default: "native",
});
export default function Index() {

  const [scooterQuote, setScooterQuote] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    fetch('https://api.kanye.rest')
    .then(response => response.json())
    .then(data => setScooterQuote(data.quote))
  },[])

  
  const closeModal = () => setIsOpen(false);


  return (


    <MyParallaxScrollView 
    icon="home"
    headerBackgroundColor={'bg-teal-300' }>

    <View className=" h-full p-8 bg-teal-600 ">
      <Text className="text-3xl mb-2 uppercase text-white ">
        <Text className="font-light">Skibidi</Text>
        <Text className="font-extrabold italic">Brackets</Text>
      </Text>
      <Text className="text-teal-200 max-w-sm  text-md italic font-semibold">
        "{scooterQuote}"
      </Text>
      <MyModal title='Modal Title' isOpen={isOpen} closeModal={closeModal}   >
        <Text>Modal Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nobis provident neque culpa necessitatibus recusandae dicta, dolorem quis aliquam cum consequuntur ex exercitationem nesciunt repellendus iusto inventore doloremque, fugit quae amet! Tenetur alias aliquid omnis quisquam maiores temporibus, quas error, libero assumenda qui magni, recusandae ut est. Quo vitae facilis voluptate maxime velit saepe odio voluptatibus adipisci quos quae exercitationem repudiandae sit obcaecati aspernatur blanditiis molestias, illo sequi laudantium. Maiores blanditiis deleniti ipsam dignissimos facilis, vel animi tempore doloremque? Tempore possimus natus voluptatum eveniet laudantium placeat quia nihil excepturi totam iste voluptatibus, animi adipisci hic nam voluptatem laborum, quam fuga repellendus aliquid quis fugiat. Illo, illum recusandae nulla maxime fuga iusto facere consequatur velit, perspiciatis aperiam ducimus veritatis rerum. Perferendis rerum eaque provident placeat consectetur, nostrum sed veniam! Tenetur velit, quasi molestias ad nihil magni tempora, rem odit ipsam odio sint a non consequuntur illum illo explicabo beatae autem, facilis qui repudiandae ratione nemo dolore. Consectetur aliquam quas expedita perspiciatis illo tempore reiciendis, mollitia quaerat fugit, nesciunt enim ipsum sit asperiores harum. Ad quo enim iure vel quas, nam tempora ullam deserunt quibusdam reprehenderit doloremque ratione quaerat at. Exercitationem doloribus quaerat facilis enim amet minima assumenda cumque dolorem laborum sint magni temporibus a ullam fugiat, necessitatibus quam odio soluta nisi aperiam iste at quo. Deserunt blanditiis non iusto saepe a reiciendis repellendus ullam, nobis nulla, iste veniam, consectetur sed. Beatae sit libero totam, unde officiis tenetur voluptatem, accusantium laborum fuga vitae modi necessitatibus quasi dolores cumque earum commodi ipsum dolor sint veniam fugit dignissimos inventore laboriosam saepe. Cupiditate tenetur aliquid deleniti sint voluptates nobis delectus! Iure itaque aut illum quasi dolorem explicabo a at modi. Deserunt repellendus, iure quibusdam voluptatem quisquam atque obcaecati nulla reiciendis vel magnam mollitia vitae ipsum temporibus, eligendi delectus, cumque placeat magni voluptate totam exercitationem repellat nobis. Sint tempora quidem, quam delectus dolores obcaecati culpa. Placeat nobis ab exercitationem, excepturi veritatis laudantium repellendus impedit, dicta ducimus repellat quas magni recusandae officia cumque incidunt. Recusandae iste, sint voluptate minus laudantium est voluptates tenetur, veritatis praesentium labore, reiciendis eiu.</Text>
      </MyModal>
      <MyButton text='Open Modal' onPress={() => setIsOpen(true)} />
       
      
      
    </View>
    </MyParallaxScrollView>
    
  );
}
