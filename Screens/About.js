// import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
// import React, { useState, useEffect } from 'react'
// import { blue } from 'react-native-reanimated/lib/typescript/Colors';

// const table = () => {
//   const [posts, setPosts] = useState();
//   const [loading, setLoading] = useState();

//   useEffect(() => {
//     setLoading(true);
//     fetch('https://jsonplaceholder.typicode.com/posts');

//     .then((res) => res.json());
//     .then((Data) => setPosts(data))
//     .finally(() => SeetLoading('false'));

//   }[]);
//  return(
//   <View>
//     {loading ? (
//       <ActivityIndicator  size='large' color={blue}/>
//     );
//     posts.slice(0.5).map((post) =>)
//     <Text key={post.id}/>
//     {post.id} {post.Title}
//   }
//   </View>
//  )

// }

// const TableExample = () => {

//   const data = [
//     { id: 1, userId: 10, Title: 'Short Title', Body: 'Short body' },
//     { id: 2, userId: 11, Title: 'This is a very long title that will overflow', Body: 'Longer body content here' },
//     { id: 3, userId: 12, Title: 'Another long title', Body: 'Even more content in the body section to scroll' },
//     { id: 4, userId: 13, Title: 'More data', Body: 'Some body text that should wrap or scroll' },
//   ];

//   return (
//     <ScrollView horizontal>
//       <View>
//         <View style={[styles.row, styles.header]}>
//           <Text style={styles.cell}>ID</Text>
//           <Text style={styles.cell}>UserID</Text>
//           <Text style={styles.cell}>Title</Text>
//           <Text style={styles.cell}>Body</Text>
//         </View>

//         <ScrollView style={{ maxHeight: 400 }}>
//           {data.map((item) => (
//             <View key={item.id} style={styles.row}>
//               <Text style={styles.cell}>{item.id}</Text>
//               <Text style={styles.cell}>{item.userId}</Text>
//               <Text style={styles.cell}>{item.Title}</Text>
//               <Text style={styles.cell}>{item.Body}</Text>
//             </View>
//           ))}
//         </ScrollView>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   row: {
//     flexDirection: 'row',
//   },
//   header: {
//     backgroundColor: '#eee',
//   },
//   cell: {
//     minWidth: 120, // 👈 Add minWidth to allow horizontal scroll
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     textAlign: 'center',
//   },
// });

// export default TableExample;

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';

const PAGE_SIZE = 10;

const TableExample = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Error fetching data:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleRowPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    if ((page + 1) * PAGE_SIZE < posts.length) {
      setPage((prev) => prev + 1);
    }
  };

  const paginatedPosts = posts.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <ScrollView>
      <View>
        {/* Table Header */}
        <View style={[styles.row, styles.header]}>
          <Text style={styles.cell}>ID</Text>
          <Text style={styles.celluser}>UserID</Text>
          <Text style={styles.celltittle}>Title</Text>
          <Text style={styles.cellbody}>Body</Text>
        </View>

        {/* Table Body */}
        <ScrollView style={{ maxHeight: 950 }}>
          {loading ? (
            <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
          ) : (
            paginatedPosts.map((item) => (
              <TouchableOpacity key={item.id} onPress={() => handleRowPress(item)}>
                <View style={styles.row}>
                  <Text style={styles.cell}>{item.id}</Text>
                  <Text style={styles.celluser}>{item.userId}</Text>
                  <Text style={styles.celltittle}>
                    {item.title.split(' ').slice(0, 5).join(' ') +
                      (item.title.split(' ').length > 5 ? '...' : '')}
                  </Text>
                  <Text style={styles.cellbody}>
                    {item.body.split(' ').slice(0, 5).join(' ') +
                      (item.body.split(' ').length > 5 ? '...' : '')}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

        {/* Pagination */}
        <View style={styles.pagination}>
          <TouchableOpacity
            style={[styles.pageButton, page === 0 && styles.disabledButton]}
            onPress={handlePrevPage}
            disabled={page === 0}
          >
            <Text style={styles.pageButtonText}>Previous Page</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.pageButton,
              (page + 1) * PAGE_SIZE >= posts.length && styles.disabledButton,
            ]}
            onPress={handleNextPage}
            disabled={(page + 1) * PAGE_SIZE >= posts.length}
          >
            <Text style={styles.pageButtonText}>Next Page</Text>

          </TouchableOpacity>
        </View>
      </View>
      <View>
        {/* Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.card}>
              {selectedItem && (
                <>
                  <Text style={styles.cardTitle}>Post Details</Text>
                  <Text>
                    <Text style={styles.bold}>ID:</Text> {selectedItem.id}
                  </Text>
                  <Text>
                    <Text style={styles.bold}>UserID:</Text> {selectedItem.userId}
                  </Text>
                  <Text>
                    <Text style={styles.bold}>Title:</Text> {selectedItem.title}
                  </Text>
                  <Text>
                    <Text style={styles.bold}>Body:</Text> {selectedItem.body}
                  </Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={{ color: 'white', textAlign: 'center' }}>Close</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  header: {
    backgroundColor: '#eee',
  },
  cell: {
    minWidth: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
  },
  celluser: {
    width: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
  },
  celltittle: {
    width: 180,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  cellbody: {
    width: 150,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 24,
    width: 300,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
    gap: 10,
  },
  pageButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  pageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
});

export default TableExample;
