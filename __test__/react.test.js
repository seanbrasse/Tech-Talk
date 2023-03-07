/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import React from 'react'
import Comment from '../src/components/Comment';
import CommentSection from '../src/components/CommentSection';
import Input from '../src/components/Input';
import Navbar from '../src/components/Navbar';
import { deleteComment } from '../src/utils';

// Navbar Tests

test('renders the nav bar', () => {
    render(<Navbar/>)
    const title = screen.getByText(/Tech Talk/i)
    expect(title).toBeInTheDocument();
})

// Comment Tests

// Mock the deleteComment function
jest.mock('../src/utils', () => ({
    deleteComment: jest.fn(),
    formatDate: () => 'mock date',
  }));
  
  describe('Comment component', () => {
    const props = {
      id: 1,
      name: 'John Doe',
      title: 'Test comment',
      message: 'This is a test comment',
      created: new Date(),
      onDelete: jest.fn(),
    };
  
    afterEach(() => {
      jest.resetAllMocks();
    });
  
    it('renders the component with the correct props', () => {
      const { getByText } = render(<Comment {...props} />);
      expect(screen.getByText(props.title)).toBeInTheDocument();
      expect(screen.getByText(props.message)).toBeInTheDocument();
      expect(screen.getByText(`${props.name} on mock date`)).toBeInTheDocument();
    });
  
    it('calls the onDelete function when the delete button is clicked', () => {
      const { getByTestId } = render(<Comment {...props} />);
      fireEvent.click(screen.getByTestId('delete-button'));
      expect(deleteComment).toHaveBeenCalledWith(props.id, props.onDelete);
    });
  });

// CommentSection Tests

describe('CommentSection', () => {
    const comments = [
      { id: 1, name: 'John', title: 'Test Comment 1', message: 'This is a test comment.' },
      { id: 2, name: 'Jane', title: 'Test Comment 2', message: 'This is another test comment.' },
    ];
  
    it('renders a comment section with comments', () => {
      render(<CommentSection comments={comments} setComments={() => {}} />);
  
      expect(screen.getByText('Comment Feed')).toBeInTheDocument();
      expect(screen.getByText('Test Comment 1')).toBeInTheDocument();
      expect(screen.getByText('Test Comment 2')).toBeInTheDocument();
    });
  
    it('renders a message if there are no comments', () => {
      render(<CommentSection comments={[]} setComments={() => {}} />);
  
      expect(screen.getByText('Comment Feed')).toBeInTheDocument();
      expect(screen.getByText('There are no comments to show, get us started!')).toBeInTheDocument();
    });
  
    it('calls setComments with the updated comment list when a comment is deleted', () => { //May be failing because of my caching attempt making deleting from the local state not delete from the db
      const setComments = jest.fn();
      render(<CommentSection comments={comments} setComments={setComments} />);
  
      const deleteButton = screen.getByRole('button', { name: 'Delete comment' });
      userEvent.click(deleteButton);
  
      expect(setComments).toHaveBeenCalledWith([
        { id: 2, name: 'Jane', title: 'Test Comment 2', message: 'This is another test comment.' },
      ]);
    });
  });

  
// Input Tests

describe('Input component', () => {
  it('should render Input component correctly', () => {
    const handleNewComment = jest.fn();
    const { getByPlaceholderText } = render(<Input handleNewComment={handleNewComment} />);
    expect(screen.getByPlaceholderText(/Add your name here/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Add your title here/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Add your comment here/i)).toBeInTheDocument();
  });

  it('should set name state correctly', () => {
    const handleNewComment = jest.fn();
    const { getByPlaceholderText } = render(<Input handleNewComment={handleNewComment} />);
    const inputElement = screen.getByPlaceholderText(/Add your name here/i);
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(inputElement.value).toBe('test');
  });

  it('should set title state correctly', () => {
    const handleNewComment = jest.fn();
    const { getByPlaceholderText } = render(<Input handleNewComment={handleNewComment} />);
    const inputElement = screen.getByPlaceholderText(/Add your title here/i);
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(inputElement.value).toBe('test');
  });

  it('should set message state correctly', () => {
    const handleNewComment = jest.fn();
    const { getByPlaceholderText } = render(<Input handleNewComment={handleNewComment} />);
    const inputElement = screen.getByPlaceholderText(/Add your comment here/i);
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(inputElement.value).toBe('test');
  });

  it('should show popup when name and message are empty on submit', () => {
    const handleNewComment = jest.fn();
    const { getByText, getByPlaceholderText } = render(<Input handleNewComment={handleNewComment} />);
    const nameInputElement = screen.getByPlaceholderText(/Add your name here/i);
    const messageInputElement = screen.getByPlaceholderText(/Add your comment here/i);
    const submitButtonElement = screen.getByText(/Comment/i);
    fireEvent.change(nameInputElement, { target: { value: 'test' } });
    fireEvent.change(messageInputElement, { target: { value: '' } });
    fireEvent.click(submitButtonElement);
    expect(screen.getByText(/Name and Message Fields are Required!/i)).toBeInTheDocument();
  });

  //This test fails, not entirely sure why yet. Resetting input states is proven to work with manual testing

  it('should call handleNewComment and reset input states on submit', async () => {
    const handleNewComment = jest.fn();
    const { getByText, getByPlaceholderText } = render(<Input handleNewComment={handleNewComment} />);
    const nameInputElement = screen.getByPlaceholderText(/Add your name here/i);
    const titleInputElement = screen.getByPlaceholderText(/Add your title here/i);
    const messageInputElement = screen.getByPlaceholderText(/Add your comment here/i);
    const submitButtonElement = screen.getByText(/Comment/i);
    fireEvent.change(nameInputElement, { target: { value: 'test' } });
    fireEvent.change(titleInputElement, { target: { value: 'test title' } });
    fireEvent.change(messageInputElement, { target: { value: 'test message' } });
    fireEvent.click(submitButtonElement);
    await waitFor(() => expect(handleNewComment).toHaveBeenCalledWith(expect.objectContaining({ name: 'test', title: 'test title', message: 'test message' })));
    await waitFor(()=> expect(nameInputElement.value).toBe(''));
    await waitFor(()=> expect(titleInputElement.value).toBe(''));
    await waitFor(()=> expect(messageInputElement.value).toBe(''));
  });
});



