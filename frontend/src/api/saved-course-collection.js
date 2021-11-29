const STORAGE_KEY = "my_courses"

const tryGetCourses = () => {
    let coursesString = localStorage.getItem(STORAGE_KEY)

    return coursesString ? JSON.parse(coursesString) : []
}

const SavedCourseCollection = {
    add(courseId) {
        if (!localStorage.getItem(STORAGE_KEY)) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
        }
    
        let courses = JSON.parse(localStorage.getItem(STORAGE_KEY))
    
        courses.push(courseId)
    
        localStorage.setItem(STORAGE_KEY, JSON.stringify(courses))
        
        window.dispatchEvent( new Event('storage') )
    },
    set(courseIds) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(courseIds))

        window.dispatchEvent( new Event('storage') )
    },
    get() {
        return tryGetCourses()
    },
    exists(courseId) {
        let courses = tryGetCourses()

        return courses.some(id => id === courseId)
    },
    remove(courseId) {
        let courses = tryGetCourses()

        courses = courses.filter(id => id != courseId)

        localStorage.setItem(STORAGE_KEY, JSON.stringify(courses))

        window.dispatchEvent( new Event('storage') )
    }
}

export default SavedCourseCollection