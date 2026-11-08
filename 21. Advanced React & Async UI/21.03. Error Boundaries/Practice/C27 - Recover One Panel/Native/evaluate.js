import React from 'react';
import {render,screen,fireEvent,cleanup} from '@testing-library/react';
import App from '../src/App.js';
afterEach(function(){cleanup();jest.restoreAllMocks();});
function breakPanel(){jest.spyOn(console,'error').mockImplementation(function(){});fireEvent.click(screen.getByRole('button',{name:'Break session panel'}));}
test('shows the note and session before a failure',function(){render(<App/>);expect(screen.getByLabelText('Visit note')).toBeTruthy();expect(screen.getByRole('heading',{name:'Morning session'})).toBeTruthy();});
test('keeps the entered note visible after the session panel fails',function(){render(<App/>);fireEvent.change(screen.getByLabelText('Visit note'),{target:{value:'Bring a small bowl idea'}});breakPanel();expect(screen.getByRole('alert')).toBeTruthy();expect(screen.getByLabelText('Visit note').value).toBe('Bring a small bowl idea');});
test('recovers the panel without resetting the note',function(){render(<App/>);fireEvent.change(screen.getByLabelText('Visit note'),{target:{value:'Sit near the window'}});breakPanel();fireEvent.click(screen.getByRole('button',{name:'Try again'}));expect(screen.getByRole('heading',{name:'Morning session'})).toBeTruthy();expect(screen.queryByRole('alert')).toBe(null);expect(screen.getByLabelText('Visit note').value).toBe('Sit near the window');});
test('leaves the note editable during failure and after recovery',function(){render(<App/>);breakPanel();fireEvent.change(screen.getByLabelText('Visit note'),{target:{value:'Updated while waiting'}});fireEvent.click(screen.getByRole('button',{name:'Try again'}));expect(screen.getByLabelText('Visit note').value).toBe('Updated while waiting');});
