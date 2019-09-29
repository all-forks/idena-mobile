import React, { useState } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'

export default function Drafts() {
  const [drafts, updateDrafts] = useState([
    {
      pics: [
        'https://images.unsplash.com/photo-1546881963-ac8d67aee789?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1521336243929-443fa17fb222?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
        'https://images.unsplash.com/photo-1546881963-ac8d67aee789?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1546881963-ac8d67aee789?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      ],
      nextOrder: [0,1,2,3],
      choosenWordPairs: { name: 'Opacity', desc: 'Random'},
      date: Date.now().toLocaleString()
    },
    {
      pics: [
        'https://images.unsplash.com/photo-1546881963-ac8d67aee789?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1546881963-ac8d67aee789?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1521336243929-443fa17fb222?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
        'https://images.unsplash.com/photo-1546881963-ac8d67aee789?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      ],
      nextOrder: [2,1,3,4],
      choosenWordPairs: { name: 'Report', desc: 'Abuse'},
      date: Date.now().toLocaleString()
    },
    {
      pics: [
        'https://images.unsplash.com/photo-1546881963-ac8d67aee789?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1546881963-ac8d67aee789?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1546881963-ac8d67aee789?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1521336243929-443fa17fb222?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
      ],
      nextOrder: [3,0,2,1],
      choosenWordPairs: { name: 't', desc: ''},
      date: Date.now().toLocaleString()
    },
    {
      pics: [
        'https://images.unsplash.com/photo-1546881963-ac8d67aee789?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1546881963-ac8d67aee789?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1546881963-ac8d67aee789?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1546881963-ac8d67aee789?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      ],
      nextOrder: [3,2,3,1],
      choosenWordPairs: { name: 'Test', desc: 'Desc'},
      date: Date.now().toLocaleString()
    },
    {
      pics: [
        'https://images.unsplash.com/photo-1521336243929-443fa17fb222?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
        'https://images.unsplash.com/photo-1546881963-ac8d67aee789?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1546881963-ac8d67aee789?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1546881963-ac8d67aee789?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      ],
      nextOrder: [1,0,2,3],
      choosenWordPairs: { name: 'Desc', desc: 'Test'},
      date: Date.now().toLocaleString()
    }
  ])
  return (
    <ScrollView contentContainerStyle={{ padding: 20, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
      {drafts.map(({ pics, nextOrder, date, choosenWordPairs }) => (
        <View>
          <Image 
           source={{ uri: pics[nextOrder[0]] }}
           resizeMode="cover"
           style={{ borderRadius: 8, width: 160, height: 160 }}
          />
          <Text style={{ marginTop: 15 }}>{choosenWordPairs.name} / {choosenWordPairs.desc}</Text>
          <Text style={{ marginTop: 15 }}>{date}</Text>
        </View>
      ))}
    </ScrollView>
  )
}
