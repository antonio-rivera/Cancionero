import { Props } from "../../interface"
import { useParams } from "react-router-dom"
export function SongView({ songs }: Props) {
  const { id } = useParams()
  console.log(id);

  return <>
    <h1>Song view</h1>
  </>
}