
import Searchbar from "./Searchbar/Searchbar";
import { ToastContainer, toast } from 'react-toastify';
import { ImageGallery } from "./ImageGallery/ImageGallery";
import LoaderImg from "./Loader/Loader";
import Modal from "./Modal/Modal";
import Btn from "./Button/Button";
import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { fetchImages } from 'api/pixabayAPI';


export const App = () => {

 const [items, setItems] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [totalImages, setTotalImages] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [largeImage, setLargeImage] = useState('');

  const calcImages = totalImages - page * 12;


  
  // async componentDidUpdate(_, prevState) {
  //   const prevSearch = prevState.searchItem;
  //   const newSearch = this.state.searchItem;
  //   const prevPage = prevState.page;
  //   const newPage = this.state.page;

  //   if (prevSearch !== newSearch || prevPage !== newPage) {
  //     this.setState({ status: 'pending' });
  //     if (prevSearch !== newSearch)  {
  //           this.setState({page: 1})
  //         }
  
  //     try {
  //       const response = await axios.get(`/?q=${newSearch}&page=${newPage}&key=31315940-fbb1061bb3bfe12c6324aab94&image_type=photo&orientation=horizontal&per_page=12`);
        
  //       const currentItems = response.data.hits.map(({ id, webformatURL, largeImageURL, tags }) => {
  //         return { id, webformatURL, largeImageURL, tags };
  //       });
  //       this.setState((prevState) => ({
  //         items: [...prevState.items, ...currentItems], status: 'resolved',
  //       }));
  //       if (response.data.hits.length === 0) {
  //         toast.error('Please, enter correct data.', { position: "top-center", });
  //       }
  //     } catch (error) {
  //       toast.error('Sorry, some troubles have occurred ! Try again.', { position: "top-center", });
  //       this.setState({ status: 'rejected' });
  //     }
  //   };
  // }; 

  const handleFormSubmit = searchItem => {
   setSearchItem(searchItem);
    setPage(1);
  setItems([]);
  };
  
   const onLoadMore = () => setPage(prevPage => prevPage + 1);

  const onModal = largeImage => setLargeImage(largeImage);

  const onCloseModal = () => setLargeImage('');

   useEffect(() => {
    if (!searchItem) return;

    setStatus('pending');
    async function getImages(searchItem, page) {
      try {
        const data = await fetchImages(searchItem, page);
        setItems(prevItems => [...prevItems, ...data.hits]);
        setTotalImages(data.totalHits);
        setStatus('resolved');

         if (data.hits.length === 0) {
          setStatus('empty');
          setItems([]);
          return;
        }

        if (page === 1) {
          setItems(data.hits);
          return;
        }
      } catch (error) {
        setStatus('error');
        console.log(error.message);
      }
     }
     
    getImages(searchItem, page);
  }, [page, searchItem]);
 const ClickLoadBtn = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  const toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ imageModal: largeImageURL });
  };
  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery images={images} onModal={onModal} />

      {status === 'pending' && totalImages === 0 && <Loader />}

      {status === 'idle' && (
        <Notification message="Please find the image" status={status} />
      )}

      {status === 'empty' && (
        <Notification
          message="We didn't find anything, try to enter the correct query"
          status={status}
        />
      )}

      {status === 'error' && (
        <Notification
          message="Whoops, something went wrong, try again"
          status={status}
        />
      )}

      {calcImages > 0 && images.length > 0 && (
        <Button onLoadMore={onLoadMore} status={status} />
      )}

      {largeImage && (
        <Modal onClose={onCloseModal}>
          <img src={largeImage} alt="IMG" />
        </Modal>
      )}
      <ToastContainer />
    </Container>
  );
};
    



//     return (
//     <>
//         <Searchbar onSubmit={handleFormSubmit} />
//         {items.length > 0 && <ImageGallery pictures={items} onClick={toggleModal} />}
//         {status === 'pending' && <LoaderImg />}
//         {(items.length === 12 || items.length > 12) && <Btn onClick={ClickLoadBtn} />}
//         {showModal && (
//           <Modal onClose={toggleModal}>
//             <img src={imageModal} alt="" />
//           </Modal>
//         )}
//         <ToastContainer autoClose={3000} />
//     </>
//   );
//         }


export default App;