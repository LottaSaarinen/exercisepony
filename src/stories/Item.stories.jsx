import Item from '../components/Item'
import { MemoryRouter } from 'react-router-dom'

export default {
  title: 'Components/Item',
  component: Item,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  argTypes: {
    data: { control: 'object' },
  },
}

export const Default = { 
    args: {
        data: {
          id:             "1",
          type:           "Kevyt treeni",
          duration:       30,
          exerciseDate:   "2023-03-18",
          rating:         "Sujui melko hyvin",
          comment:        ""         
       
    }
  }
}

export const OnlyRequiredData = {
  args: {
    data: {
      id:             "2",
      type:           "Kilpailut",
      duration:       90,
      exerciseDate:   "2023-03-30",
      rating:         "Ei sujunut niin hyvin",
      comment:        ""
    }
  }  
}