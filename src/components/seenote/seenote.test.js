 import {render} from '@testing-library/react'
import Seenote from "./seenote";


//  ♣ not working ♣
test('checking if notes are not null', () => {
    render(<Seenote />);
  
    const note = screen.getByTestId('note-content');
    expect(note).toHaveTextContent(/\S+/);
  });