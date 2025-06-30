"use client"

import { useParams } from 'next/navigation'

const Profile = () => {
  const { id } = useParams()
  return <div>profile: {id}</div>
}

export default Profile