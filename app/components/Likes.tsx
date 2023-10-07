interface LikesProps {
    likedBy: string[];
}

const Likes: React.FC<LikesProps> = ({ likedBy }) => {
    return (
        <div>
            <h3>Liked By:</h3>
            <ul>
                {likedBy.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default Likes;