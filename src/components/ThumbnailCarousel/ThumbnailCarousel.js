import React from 'react'
import ImageGallery from 'react-image-gallery';

class ThumbnailCarousel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showVideo: {},
      fullScreen: false
    }
  }

  resetVideo = () => {
    this.setState({ showVideo: {} });
  }

  toggleShowVideo = (url) => {
    this.setState((prevState) => ({
      ...prevState,
      showVideo: {
        ...prevState.showVideo,
        [url]: !prevState.showVideo[url]
      }
    }))
  }

  renderVideo = (item) => (
    <div>
      {
          this.state.showVideo[item.embedUrl]
            ? (
              <div className="video-wrapper">
                <div
                  className="close-video"
                  onClick={() => this.toggleShowVideo(item.embedUrl)}
                />
                <iframe
                  src={item.embedUrl}
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay"
                  title="gallery"
                />
              </div>
            )
            : (
              <a onClick={() => this.toggleShowVideo(item.embedUrl)}>
                <div className="play-button" />
                <img className="image-gallery-image" src={item.original} alt="img" />
                {
                item.description
                  && (
                  <span
                    className="image-gallery-description"
                    style={{ right: '0', left: 'initial' }}
                  >
                    {item.description}
                  </span>
                  )
              }
              </a>
            )
        }
    </div>
  )

  handleScreenChange = (fullScreen) => {
    this.setState({
      fullScreen
    })
  }

  getId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  render() {
    const { items } = this.props
    const { fullScreen } = this.state
    // console.log(items)
    const gallery = items ? items.map((i) => {
      if (i && i.type === 'videos') {
        const id = this.getId(i.url)
        const url = `https://www.youtube.com/embed/${id}`
        // console.log(id, url, i)
        return ({
          original: `https://img.youtube.com/vi/${id}/1.jpg`,
          thumbnail: `https://img.youtube.com/vi/${id}/1.jpg`,
          embedUrl: `${url}?autoplay=1`,
          renderItem: this.renderVideo,
        })
      }
      return ({
        original: i && i.url,
        thumbnail: i && i.url,
      })
    }) : []

    // console.log('gallery', gallery)
    return (
      <div className="thumbCarousel">
        <ImageGallery
          items={gallery}
          showBullets={false}
          showThumbnails={gallery.length > 1}
          showPlayButton={false}
          useBrowserFullscreen={false}
          showNav={fullScreen}
          onScreenChange={this.handleScreenChange}
        />
      </div>
    )
  }
}

export default ThumbnailCarousel
