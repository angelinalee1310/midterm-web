import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Фейковые данные
const initialPosts = [
  { id: 1, text: 'Привет, Twitter!', likes: 10, dislikes: 2 },
  { id: 2, text: 'Моя первая запись.', likes: 5, dislikes: 0 },
];

const profileInfo = {
  username: 'Lee',
  name: 'Angelina',
  bio: 'I love twitter',
};

function Post({ post }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikes(likes + 1);
    } else {
      setLiked(false);
      setLikes(likes - 1);
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      setDisliked(true);
      setDislikes(dislikes + 1);
    } else {
      setDisliked(false);
      setDislikes(dislikes - 1);
    }
  };

  return (
    <div>
      <p>{post.text}</p>
      <p>Лайки: {likes}</p>
      <p>Дизлайки: {dislikes}</p>
      <button onClick={handleLike}>
        {liked ? 'Убрать лайк' : 'Лайк'}
      </button>
      <button onClick={handleDislike}>
        {disliked ? 'Убрать дизлайк' : 'Дизлайк'}
      </button>
    </div>
  );
}

function FeedPage() {
  return (
    <div>
      <h2>Лента</h2>
      {initialPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

function PublishPage({ posts, updatePosts }) {
  const [newPost, setNewPost] = useState('');
  //const [setPosts] = useState([]); // Состояние для всех записей

  const handlePublish = () => {
    if (newPost.trim() === '') {
      // Проверка на пустую запись
      return;
    }

    const newPostObj = {
      id: posts.length + 1,
      text: newPost,
      likes: 0,
      dislikes: 0,
    };

    // Обновляем состояние, добавляя новую запись к существующим записям
    const newPosts = [...posts, newPostObj];
    updatePosts(newPosts);

    // Сбрасываем значение поля для новой записи
    setNewPost('');
  };

  return (
    <div>
      <h2>Публикация</h2>
      <textarea
        placeholder="Что у вас нового?"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
      />
      <button onClick={handlePublish}>Опубликовать</button>

      <div>
        <h2>Лента</h2>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}


function ProfilePage({ profile, updateProfile }) {

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(profile.name);
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);

  const saveChanges = () => {
    // Обновляем данные профиля с новыми значениями полей
    updateProfile({ name, username, bio });
    // Выключаем режим редактирования
    setIsEditing(false);
  };

  return (
    <div>
      <h2>Профиль</h2>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button onClick={saveChanges}>Сохранить</button>
        </div>
      ) : (
        <div>
          <p>Имя: {profile.name}</p>
          <p>Имя пользователя: {profile.username}</p>
          <p>О себе: {profile.bio}</p>
          <button onClick={() => setIsEditing(true)}>Редактировать</button>
        </div>
      )}
    </div>
  );
}

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [profile, setProfile] = useState(profileInfo);

  const updatePosts = (newPosts) => {
    setPosts(newPosts);
  };

  const updateProfile = (newProfileData) => {
    setProfile({ ...profile, ...newProfileData });
  };

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<FeedPage />} />
        <Route path="profile" element={<ProfilePage profile={profile} updateProfile={updateProfile} />} />
        <Route path="post" element={<PublishPage posts={posts} updatePosts={updatePosts} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
