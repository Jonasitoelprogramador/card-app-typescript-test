export interface Entry {
  id?: string;
  title: string;
  description: string;
  // This is both Date and string because the value inputted by the user is a string but is changed in the backend to a Date object
  created_at: Date | string;
  scheduled_date: Date | string; 
}
export type EntryContextType = {
  // added darkMode and toggleDarkMode here
  entries: Entry[];
  saveEntry: (entry: Entry) => void;
  updateEntry: (id: string, entryData: Entry) => void;
  deleteEntry: (id: string) => void;
};
