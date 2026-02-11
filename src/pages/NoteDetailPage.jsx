import Card from "../components/Card";

const NoteDetailPage = () => {
  return (
    <Card key={note._id} title={note.title} content={note.content} createdAt={note.createdAt}>asfas</Card>
  )
}

export default NoteDetailPage