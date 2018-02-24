
const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach(blog => sum += blog.likes)
  return sum
}

const favoriteBlog = (blogs) => {
  let blog = blogs[0]

  blogs.forEach(b => {
    if (b.likes > blog.likes) {
      blog = b
    }
  })

  return blog
}

module.exports = {
  totalLikes,
  favoriteBlog
}

