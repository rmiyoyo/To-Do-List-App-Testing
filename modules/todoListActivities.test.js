import AvailableActivities from './todoListActivities.js';

describe('AvailableActivities', () => {
  describe('addActivity', () => {
    describe('addActivity', () => {
      beforeEach(() => {
        global.localStorage = {
          getItem: jest.fn(),
          setItem: jest.fn(),
          clear: jest.fn(),
        };
        localStorage.clear();
      });

      // Test 1
      test('should add a new activity to the activities array and update the DOM', () => {
        const listElement = document.createElement('ul');
        const activities = new AvailableActivities();
        const activity = {
          description: 'New Activity',
          completed: false,
          index: 1,
        };

        const setItemMock = jest.spyOn(Storage.prototype, 'setItem');
        const result = activities.addActivity(activity, listElement);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(activity);
        expect(listElement.children).toHaveLength(1);
        expect(listElement.children[0].textContent).toBe(
          'New Activity',
        );
        expect(setItemMock).toHaveBeenCalledWith(
          'savedActivities',
          JSON.stringify(result),
        );
      });

      // Test 2
      test('should not add an activity with an empty description and not update the DOM', () => {
        const listElement = document.createElement('ul');
        const activities = new AvailableActivities();
        const activity = {
          description: '',
          completed: false,
          index: 1,
        };

        const setItemMock = jest.spyOn(localStorage, 'setItem');
        const result = activities.addActivity(activity, listElement);

        expect(result).toHaveLength(0);
        expect(listElement.children).toHaveLength(0);
        expect(setItemMock).not.toHaveBeenCalledWith(
          'savedActivities',
          JSON.stringify(result),
        );
      });
    });
  });

  describe('removeActivity', () => {
    describe('removeActivity', () => {
      beforeEach(() => {
        localStorage.clear();
      });

      // test 3
      test('should remove the activity at the specified position from the activities array', () => {
        const initialActivities = [
          { description: 'Activity 1', completed: false, index: 1 },
          { description: 'Activity 2', completed: false, index: 2 },
          { description: 'Activity 3', completed: false, index: 3 },
        ];
        localStorage.setItem(
          'savedActivities',
          JSON.stringify(initialActivities),
        );

        const activities = new AvailableActivities();
        const result = activities.removeActivity(1);

        expect(result).toHaveLength(2);
        expect(result[0].index).toBe(1);
        expect(result[1].index).toBe(2);
      });

      // test 4
      test('should update the index of remaining activities after removing an activity', () => {
        const initialActivities = [
          { description: 'Activity 1', completed: false, index: 1 },
          { description: 'Activity 2', completed: false, index: 2 },
          { description: 'Activity 3', completed: false, index: 3 },
        ];
        localStorage.setItem(
          'savedActivities',
          JSON.stringify(initialActivities),
        );

        const activities = new AvailableActivities();

        activities.removeActivity(1);

        const storedActivities = JSON.parse(
          localStorage.getItem('savedActivities'),
        );
        expect(storedActivities).toHaveLength(2);
        expect(storedActivities[0].index).toBe(1);
        expect(storedActivities[1].index).toBe(2);
      });

      // test 5
      test('should update localStorage with the updated activities array after removing an activity', () => {
        const initialActivities = [
          { description: 'Activity 1', completed: false, index: 1 },
          { description: 'Activity 2', completed: false, index: 2 },
          { description: 'Activity 3', completed: false, index: 3 },
        ];
        localStorage.setItem(
          'savedActivities',
          JSON.stringify(initialActivities),
        );

        const activities = new AvailableActivities();

        activities.removeActivity(1);

        const storedActivities = JSON.parse(
          localStorage.getItem('savedActivities'),
        );
        expect(storedActivities).toHaveLength(2);
        expect(storedActivities[0]).toEqual({
          description: 'Activity 2',
          completed: false,
          index: 1,
        });
        expect(storedActivities[1]).toEqual({
          description: 'Activity 3',
          completed: false,
          index: 2,
        });
      });
    });
  });
});
