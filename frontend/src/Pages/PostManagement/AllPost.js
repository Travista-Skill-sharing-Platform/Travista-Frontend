import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSend } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BiSolidLike } from "react-icons/bi";
import { IoIosCreate } from "react-icons/io";
import { PiUserFocusFill } from "react-icons/pi";
import Modal from 'react-modal';
import './post.css';

Modal.setAppElement('#root');

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]); // For filtering posts
  const [postOwners, setPostOwners] = useState({}); // Map of userID to fullName
  const [showMyPosts, setShowMyPosts] = useState(false); // Toggle for "My Posts"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const [followedUsers, setFollowedUsers] = useState([]); // State to track followed users
  const [newComment, setNewComment] = useState({}); // State for new comments
  const [editingComment, setEditingComment] = useState({}); // State for editing comments
  const navigate = useNavigate();
  const loggedInUserID = localStorage.getItem('userID'); // Get the logged-in user's ID

  useEffect(() => {
      // Fetch all posts from the backend
      const fetchPosts = async () => {
        try {
          const response = await axios.get('http://localhost:8080/posts');
          setPosts(response.data);
          setFilteredPosts(response.data); // Initially show all posts

//Follow
 useEffect(() => {
    const fetchFollowedUsers = async () => {
      const userID = localStorage.getItem('userID');
      if (userID) {
        try {
          const response = await axios.get(`http://localhost:8080/user/${userID}/followedUsers`);
          setFollowedUsers(response.data);
        } catch (error) {
          console.error('Error fetching followed users:', error);
        }
      }
    };

    fetchFollowedUsers();
  }, []);

// Delete Comment
   const handleDelete = async (postId) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this post?');
      if (!confirmDelete) {
        return;
      }

      try {
        await axios.delete(`http://localhost:8080/posts/${postId}`);
        alert('Post deleted successfully!');
        setPosts(posts.filter((post) => post.id !== postId));
        setFilteredPosts(filteredPosts.filter((post) => post.id !== postId));
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post.');
      }
    };

// Update comments
  const handleUpdate = (postId) => {
      navigate(`/updatePost/${postId}`);
    };

  const handleMyPostsToggle = () => {
    if (showMyPosts) {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.userID === loggedInUserID));
    }
    setShowMyPosts(!showMyPosts);
  };

// Like
  const handleLike = async (postId) => {
      const userID = localStorage.getItem('userID');
      if (!userID) {
        alert('Please log in to like a post.');
        return;
      }
      try {
        const response = await axios.put(`http://localhost:8080/posts/${postId}/like`, null, {
          params: { userID },
        });


        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, likes: response.data.likes } : post
          )
        );

        setFilteredPosts((prevFilteredPosts) =>
          prevFilteredPosts.map((post) =>
            post.id === postId ? { ...post, likes: response.data.likes } : post
          )
        );
      } catch (error) {
        console.error('Error liking post:', error);
      }
    };

// Follow
  const handleFollowToggle = async (postOwnerID) => {
      const userID = localStorage.getItem('userID');
      if (!userID) {
        alert('Please log in to follow/unfollow users.');
        return;
      }
      try {
        if (followedUsers.includes(postOwnerID)) {

          await axios.put(`http://localhost:8080/user/${userID}/unfollow`, { unfollowUserID: postOwnerID });
          setFollowedUsers(followedUsers.filter((id) => id !== postOwnerID));
        } else {

          await axios.put(`http://localhost:8080/user/${userID}/follow`, { followUserID: postOwnerID });
          setFollowedUsers([...followedUsers, postOwnerID]);
        }
      } catch (error) {
        console.error('Error toggling follow state:', error);
      }
    };

// Add comment
  const handleAddComment = async (postId) => {
      const userID = localStorage.getItem('userID');
      if (!userID) {
        alert('Please log in to comment.');
        return;
      }
      const content = newComment[postId] || '';
      if (!content.trim()) {
        alert('Comment cannot be empty.');
        return;
      }
      try {
        const response = await axios.post(`http://localhost:8080/posts/${postId}/comment`, {
          userID,
          content,
        });

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, comments: response.data.comments } : post
          )
        );

        setFilteredPosts((prevFilteredPosts) =>
          prevFilteredPosts.map((post) =>
            post.id === postId ? { ...post, comments: response.data.comments } : post
          )
        );

        setNewComment({ ...newComment, [postId]: '' });
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    };

// Delete comment
  const handleDeleteComment = async (postId, commentId) => {
      const userID = localStorage.getItem('userID');
      try {
        await axios.delete(`http://localhost:8080/posts/${postId}/comment/${commentId}`, {
          params: { userID },
        });


        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? { ...post, comments: post.comments.filter((comment) => comment.id !== commentId) }
              : post
          )
        );

        setFilteredPosts((prevFilteredPosts) =>
          prevFilteredPosts.map((post) =>
            post.id === postId
              ? { ...post, comments: post.comments.filter((comment) => comment.id !== commentId) }
              : post
          )
        );
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    };

// Update Comments
  const handleSaveComment = async (postId, commentId, content) => {
      try {
        const userID = localStorage.getItem('userID');
        await axios.put(`http://localhost:8080/posts/${postId}/comment/${commentId}`, {
          userID,
          content,
        });


        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                ...post,
                comments: post.comments.map((comment) =>
                  comment.id === commentId ? { ...comment, content } : comment
                ),
              }
              : post
          )
        );

        setFilteredPosts((prevFilteredPosts) =>
          prevFilteredPosts.map((post) =>
            post.id === postId
              ? {
                ...post,
                comments: post.comments.map((comment) =>
                  comment.id === commentId ? { ...comment, content } : comment
                ),
              }
              : post
          )
        );

        setEditingComment({});
      } catch (error) {
        console.error('Error saving comment:', error);
      }
    };

  const openModal = (mediaUrl) => {
    setSelectedMedia(mediaUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMedia(null);
    setIsModalOpen(false);
  };

  return (
    <div className='continer_full'>
      <div className='continer'>
        <div className='continSection'>
          <div className='create_post' onClick={() => navigate('/addNewPost')}>
            <IoIosCreate />
          </div>
          <div className='create_post2' onClick={handleMyPostsToggle}>
            <PiUserFocusFill />
          </div>
          <div className='post_card_continer'>
            {filteredPosts.length === 0 ? (
              <div className='not_found_box'>
                <div className='not_found_img'></div>
                <p className='not_found_msg'>No posts found. Please create a new post.</p>
                <button
                  className='not_found_btn'
                  onClick={() => navigate('/addNewPost')}
                >
                  Create New Post
                </button>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div key={post.id} className='post_card'>
                  <div className='user_details_card'>
                    <div className='name_section_post'>
                      <p className='name_section_post_owner_name'>{postOwners[post.userID] || 'Anonymous'}</p>
                      {post.userID !== loggedInUserID && (
                        <button
                          className={followedUsers.includes(post.userID) ? 'flow_btn_unfalow' : 'flow_btn'}
                          onClick={() => handleFollowToggle(post.userID)}
                        >
                          {followedUsers.includes(post.userID) ? 'Unfollow' : 'Follow'}
                        </button>
                      )}
                    </div>
                    {post.userID === loggedInUserID && (
                      <div className='action_btn_icon_post'>
                        <FaEdit onClick={() => handleUpdate(post.id)} className='action_btn_icon' />
                        <RiDeleteBin6Fill onClick={() => handleDelete(post.id)} className='action_btn_icon' />
                      </div>
                    )}
                  </div>
                  <div className='user_details_card_di'>
                    <p className='card_post_title'>{post.title}</p>
                    <p className='card_post_description' style={{ whiteSpace: "pre-line" }}>{post.description}</p>
                  </div>
                  <div className="media-collage">
                    {(post.media || []).slice(0, 4).map((mediaUrl, index) => (
                      <div
                        key={index}
                        className={`media-item ${post.media.length > 4 && index === 3 ? 'media-overlay' : ''}`}
                        onClick={() => openModal(mediaUrl)}
                      >
                        {mediaUrl.endsWith('.mp4') ? (
                          <video controls>
                            <source src={mediaUrl} type="video/mp4" />
                          </video>
                        ) : (
                          <img src={mediaUrl} alt="Post Media" />
                        )}
                        {post.media.length > 4 && index === 3 && (
                          <div className="overlay-text">+{post.media.length - 4}</div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className='like_coment_lne'>
                    <div className='like_btn_con'>
                      <BiSolidLike
                        className={post.likes?.[loggedInUserID] ? 'unlikebtn' : 'likebtn'}
                        onClick={() => handleLike(post.id)}
                      />
                      <p className='like_num'>
                        {Object.values(post.likes || {}).filter(Boolean).length}
                      </p>
                    </div>
                    <div className='add_comennt_con'>
                      <input
                        type="text"
                        className='add_coment_input'
                        placeholder="Add a comment"
                        value={newComment[post.id] || ''}
                        onChange={(e) =>
                          setNewComment({ ...newComment, [post.id]: e.target.value })
                        }
                      />
                      <IoSend onClick={() => handleAddComment(post.id)} className='add_coment_btn' />
                    </div>
                  </div>
                  <div className='con_comm'>
                    {(post.comments || []).map((comment) => (
                      <div key={comment.id} className='coment_full_card'>
                        <div className='comnt_card'>
                          <p className='comnt_card_username'>{comment.userFullName}</p>
                          {editingComment.id === comment.id ? (
                            <input
                              type="text"
                              className='edit_comment_input'
                              value={editingComment.content}
                              onChange={(e) =>
                                setEditingComment({ ...editingComment, content: e.target.value })
                              }
                              autoFocus
                            />
                          ) : (
                            <p className='comnt_card_coment'>{comment.content}</p>
                          )}
                        </div>
                        <div className='coment_action_btn'>
                          {comment.userID === loggedInUserID && (
                            <>
                              {editingComment.id === comment.id ? (
                                <>
                                  <button
                                    className='coment_btn'
                                    onClick={() =>
                                      handleSaveComment(post.id, comment.id, editingComment.content)
                                    }
                                  >
                                    Save
                                  </button>
                                  <button
                                    className='coment_btn'
                                    onClick={() => setEditingComment({})}
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    className='coment_btn'
                                    onClick={() =>
                                      setEditingComment({ id: comment.id, content: comment.content })
                                    }
                                  >
                                    Update
                                  </button>
                                  <button
                                    className='coment_btn'
                                    onClick={() => handleDeleteComment(post.id, comment.id)}
                                  >
                                    Delete
                                  </button>
                                </>
                              )}
                            </>
                          )}
                          {post.userID === loggedInUserID && comment.userID !== loggedInUserID && (
                            <button
                              className='coment_btn'
                              onClick={() => handleDeleteComment(post.id, comment.id)}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Media Modal"
        className="media-modal"
        overlayClassName="media-modal-overlay"
      >
        <button className="close-modal-btn" onClick={closeModal}>x</button>
        {selectedMedia && selectedMedia.endsWith('.mp4') ? (
          <video controls className="modal-media">
            <source src={selectedMedia} type="video/mp4" />
          </video>
        ) : (
          <img src={selectedMedia} alt="Full Media" className="modal-media" />
        )}
      </Modal>
    </div>
  );
}

export default AllPost;
