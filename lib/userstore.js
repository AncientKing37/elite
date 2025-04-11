import { create } from 'zustand'

const useUserStore = create((set) => ({
  username: '',
  setUsername: (name) => set({ username: name }),
}))

export default useUserStore