// *Functions for navbar hamburger menue icon
document.getElementById("hamburger").addEventListener("click", function () {
  document.getElementById("sidebar").classList.remove("hidden");
  console.log("clicked");
});
document.getElementById("cross").addEventListener("click", function () {
  document.getElementById("sidebar").classList.add("hidden");
});

// *load all data function

const loadAllPosts = async (category) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts${
      category ? `?category=${category}` : ""
    }`
  );
  const data = await res.json();
  displayAllPosts(data.posts);
};

// *display all posts

const displayAllPosts = async (posts) => {
  const postContainer = document.getElementById("post-container");
  postContainer.innerHTML = ``;

  posts.forEach((post) => {
    const {
      id,
      category,
      image,
      isActive,
      title,
      description,
      comment_count,
      view_count,
      posted_time,
    } = post;
    // const { name } = posts.author;
    const div = document.createElement("div");
    div.className =
      "p-4 md:p-6 lg:p-10 bg-color-card rounded-[32px] flex gap-5 md:gap-6";
    div.innerHTML = `
    <div
                class="w-14 h-14 md:w-[72px] md:h-[72px] relative rounded-2xl flex-shrink-0"
              >
                <img
                  class="rounded-2xl w-full h-full object-cover"
                  src=${image}
                  alt=""
                />
                <div id="status-${id}"
                  class="absolute -top-1 -right-1 w-4 h-4  rounded-full z-100"
                ></div>
               
              </div>
              <!-- //text container -->
              <div class="w-full">
                <div
                  class="flex gap-5 items-center font-medium text-xs md:text-sm text-color-primary opacity-80 mb-2 md:mb-3"
                >
                  <p># ${category}</p>
                  <p>Author : ${post.author.name}</p>
                </div>
                <h3
                  class="font-bold text-base md:text-xl text-color-primary mb-3 md:mb-4"
                >
                 ${title}
                </h3>
                <p
                  class="text-color-primary text-sm md:text-base opacity-60 mb-4 md:mb-5"
                >
             ${description}
                </p>
                <hr
                  class="border-dashed border border-color-primary opacity-25 mb-4 md:mb-5"
                />
                <!-- //counter container-->
                <div class="flex justify-between">
                  <div
                    class="flex gap-5 md:gap-6 text-color primary opacity-60"
                  >
                    <div class="flex gap-1 items-center">
                      <div
                        class="text-base w-4 h-4 md:w-5 md:h-5 md:text-[20px] flex items-center p-1 rotate-x-180"
                      >
                        <i class="fa-regular fa-comment-dots"></i>
                      </div>
                      <p class="text-sm md:text-base">${comment_count}</p>
                    </div>
                    <div class="flex gap-1 items-center">
                      <div
                        class="text-base w-4 h-4 md:w-5 md:h-5 md:text-[20px] flex items-center p-1 rotate-x-180"
                      >
                        <i class="fa-regular fa-eye"></i>
                      </div>
                      <p class="text-sm md:text-base">${view_count}</p>
                    </div>
                    <div class="flex gap-1 items-center">
                      <div
                        class="text-base w-4 h-4 md:w-5 md:h-5 md:text-[20px] flex items-center p-1 rotate-x-180"
                      >
                        <i class="fa-regular fa-clock"></i>
                      </div>
                      <p class="text-sm md:text-base">${posted_time} min</p>
                    </div>
                  </div>
                  <div onclick="handleRightSide('${description}','${view_count}')" class="rounded-full bg-[#10B981] px-2 py-1">
                    <i class="fa-regular fa-envelope text-white"></i>
                  </div>
                </div>
              </div>
    `;

    postContainer.appendChild(div);
    handleActive(id, isActive);
  });
};

// *function for moving description to right sid and viewing count

const handleRightSide = (description, viewCount) => {
  const rightCardContainer = document.getElementById("right-card-container");
  const div = document.createElement("div");
  div.className = "flex justify-between mb-3 md:mb-4 bg-white rounded-2xl p-3";
  div.innerHTML = `
  <h3 class="font-bold text-sm md:text-base text-color-primary">
               ${description}
                </h3>
                <div class="flex gap-1 items-center">
                  <div class="flex items-center">
                    <i class="fa-regular fa-eye"></i>
                  </div>
                  <p class="text-sm md:text-base">${viewCount}</p>
                </div>
  `;
  rightCardContainer.appendChild(div);

  const markReadEl = document.getElementById("mark-read");
  let markReadNo = Number(markReadEl.innerText);
  markReadNo++;
  markReadEl.innerText = markReadNo;
  // console.log(markReadNo);
};

// *handle search button

const handleSearchCategory = () => {
  const searchText = document.getElementById("search-category").value;
  loadAllPosts(searchText);
};

// *Active functionality

const handleActive = (id, isActive) => {
  const statusSitation = document.getElementById(`status-${id}`);
  if (isActive === true) {
    statusSitation.classList.add("bg-green-600");
  } else {
    statusSitation.classList.add("bg-red-600");
  }
};

// *Load Latest Post

const loadLatestPost = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/latest-posts`
  );
  const data = await res.json();
  // console.log(data[0].cover_image);
  displayLatestPosts(data);
};

// *Displaying Latest Post

const displayLatestPosts = (posts) => {
  const latestPostContainer = document.getElementById("latest-post-container");

  posts.forEach((post) => {
    const { cover_image, profile_image, title, description, author } = post;

    const div = document.createElement("div");
    div.className =
      "card bg-base-100 shadow-xl text-color-primary border border-color-card-tertiary bg-white";
    div.innerHTML = `
    <figure class="px-3 md:px-4 lg:px-6 pt-3 md:pt-4 lg:pt-6">
              <img
                src=${cover_image}
                alt="Shoes"
                class="rounded-xl"
              />
            </figure>
            <div class="px-3 md:px-4 lg:px-6 mt-3 pb-3 md:pb-4">
              <div class="flex items-center gap-2 opacity-60 mb-3">
                <i class="fa-regular fa-calendar"></i>
                <p>${
                  author.posted_date ? author.posted_date : `Date Not available`
                }</p>
              </div>

              <h3 class="font-extrabold text-base md:text-lg mb-3">
              ${title ? title : `Title Not available`}
              </h3>
              <p class="opacity-60 text-sm md:text-base mb-3 md:mb-4">
               ${description}
              </p>
              <div class="flex gap-3 md:gap-4 flex-shrink-0 items-center">
                <!-- ?image div -->
                <div class="w-11 h-11 rounded-full">
                  <img
                    class="w-full h-full object-cover rounded-full"
                    src=${profile_image}
                    alt=""
                  />
                </div>
                <div>
                  <h3 class="font-bold text-sm lg:text-base">
                 ${author.name}
                  </h3>
                  <p class="opacity-60 text-xs lg:text-sm">${
                    author.designation
                      ? author.designation
                      : `Designation not available`
                  }</p>
                </div>
              </div>
            </div>`;
    latestPostContainer.appendChild(div);
  });
};

// *calling function globaly
loadAllPosts();
loadLatestPost();
