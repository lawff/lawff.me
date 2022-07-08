import r from '../blogIndex.json'
import NavLink from './NavLink'

export interface Post {
  path: string
  title: string
  date: string
  lang?: string
  desc?: string
  platform?: string
  duration?: string
}

const ListPosts = () => {
  return (
    <ul>

      { r?.routes?.length > 0
        ? (
          <>
            {
              r.routes.map((route) => {
                if (route.index) return null
                return (
                  <NavLink key={route.path} href={route.path} classes="mb-4 block">
                    <li className="no-underline py-0.5em">
                      <div className="title text-lg">
                        { route.title }
                      </div>

                      <div className="time opacity-50 text-sm -mt-1">
                        { route.date }
                        <span className="op80">· { route.readingTime }</span>
                      </div>
                    </li>
                  </NavLink>
                )
              })
            }
          </>
        )
        : (
          <div className="py2 op50">
        nothing here yet
          </div>
        )}
    </ul>
  )
}

export default ListPosts
