import CustomAppBar from "../components/CustomAppBar/CustomAppBar";
import { useState, useEffect } from "react";
import CustomTile from "../CustomTile/CustomTile";
import { Row, Spinner } from "react-bootstrap";
const Home = () => {
  const [videos, setVideos] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    async function getVideos() {
      const response = await fetch(
        `https://salty-savannah-61881.herokuapp.com/videos`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setVideos(data);
    }
    getVideos();
  }, []);
  return (
    <div>
      <CustomAppBar
        label="Search"
        onSearch={(event) => {
          setSearchText(event.target.value);
        }}
      />
      {videos.length === 0 ? (
        <Spinner
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
          }}
          animation="grow"
          variant="light"
          className="my-auto mx-auto"
          margin="auto"
        />
      ) : (
        <Row xs={1} md={3} className="g-4">
          {videos
            .filter((e) =>
              searchText.length !== 0
                ? e.title.toLowerCase().includes(searchText.toLowerCase())
                : true
            )
            .map((e) => (
              <CustomTile
                title={e.title}
                uploadedAgo={e.uploadedAgo}
                uploadedBy={e.uploadedBy}
                image={e.image}
                views={e.views}
              />
            ))}
        </Row>
      )}
    </div>
  );
};

export default Home;
