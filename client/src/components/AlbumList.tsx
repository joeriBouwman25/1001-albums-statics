export const AlbumList = ({ albums }) => {
  console.log(albums);
  return (
    <div>
      {albums.map((album) => (
        <>
          <h2>
            {album.artist} - {album.title}
          </h2>
          <img src={album.artwork} />
          <div>
            <p>Year: {album.year}</p>
            <p>Length: {album.length}</p>
          </div>
        </>
      ))}
    </div>
  );
};
