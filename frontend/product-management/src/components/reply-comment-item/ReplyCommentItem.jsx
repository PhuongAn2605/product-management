// import { CommentContentStyle, CommenterStyle, CommentStyle, ContentStyle } from "../comment-item/CommentItem";
// import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';

// const ReplyCommentItem = () => {
//   return (
//     <CommentStyle>
//       <CommentContentStyle>
//         <CommentTwoToneIcon color={isReply ? "success" : "primary"} />
//         &nbsp;&nbsp;&nbsp;
//         <CommenterStyle>
//           {commenter === userName ? "Bạn" : commenter}
//           &nbsp;&nbsp;&nbsp;
//         </CommenterStyle>
//         <ContentStyle>{content}</ContentStyle>
//         {!isEmpty(replyComments) &&
//           replyComments.map((r) => {
//             return (
//               <DisplayReplyCommentStyle>
//                 <CommentItem
//                   key={r._id}
//                   comment={r}
//                   userName={userName}
//                   // likeComment={likeComment}
//                   commetLikes
//                   // getRepliesByCommentId
//                   // replyComments
//                   isReplied={true}
//                 />
//               </DisplayReplyCommentStyle>
//             );
//           })}
//         {!isReplied && (
//           <CommentInput
//             commentId={commentId}
//             isComment={false}
//             title={
//               commenter === userName
//                 ? "Trả lời chính bạn"
//                 : "Trả lời " + commenter
//             }
//           />
//         )}
//       </CommentContentStyle>
//     </CommentStyle>
//   );
// };
