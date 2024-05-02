import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import defaultImage from '../Images/5402435_account_profile_user_avatar_man_icon.svg';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

export default function AskQuestions() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    const [question, setQuestion] = useState([]);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [modalClass, setModalClass] = useState('hide-modal');
    const [askQuestionStatus, setAskQuestionStatus] = useState('not published');
    const [file, setFile] = useState(null);
    const [ askQuestionContent, setAskQuestionContent ] = useState('')
    const [askQuestionApi, setAskQuestionApi] = useState({
        title: '',
        content: '',
        question_image: '',
    });

    // Get questions on page load
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/wp-json/wp/v2/questions`)
            .then((response) => {
                setQuestion(response.data);
            }).catch((err) => {
                console.error(err);
            });
    }, []);

    // Get questions when user submits question
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/wp-json/wp/v2/questions`)
            .then((response) => {
                setQuestion(response.data);
            }).catch((err) => {
                console.error(err);
            });
    }, [askQuestionApi, search]);

    // Return users
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/wp-json/wp/v2/users`)
            .then((response) => {
                setUsers(response.data);
            }).catch((err) => {
                console.error(err);
            });
    }, []);

    // Handle file change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    // Handle change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAskQuestionApi(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    // TinyMC Handle Change
    function handleChangeContent(e) {
        setAskQuestionContent(e.target.getContent());
    }

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Upload image if file exists
            let imageUrl = '';
            if (file && userDetails) {
                const formData = new FormData();
                formData.append('file', file);
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/wp-json/wp/v2/media`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${userDetails.token}`
                        }
                    }
                );
                imageUrl = response.data.source_url;
            }

            // Create comment
            const commentResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/wp-json/wp/v2/questions`,
                {
                    author: userDetails.id,
                    title: askQuestionApi.title,
                    content: askQuestionContent,
                    excerpt: askQuestionContent,
                    status: 'publish',
                    acf: {
                        'question_image': imageUrl,
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${userDetails.token}`
                    }
                }
            ).then((response) => {
            })
            setAskQuestionStatus('published');
        } catch (error) {
            console.error('Error submitting question:', error);
        }
    }


    // Rendering questions
    const returnQuestions = question.map((question, index) => {
        let userName = "";
        let userProfileImg = "";
        let questionPosted = Date.now() - new Date(question.date);
        let days = Math.floor(questionPosted/(86400 * 1000));

        for (let name of users) {
            if ( name.id == question.author) {
              userName = name.name;
              userProfileImg = name['avatar_urls']['24'];
            }
          }

          function commentCount() {
            return axios.get(`${question._links.replies['0'].href}`)
            .then((response) => {
              numberOfComments[0].count = response.data.length;
              localStorage.setItem(`comment_count${index}`, numberOfComments[0].count)
            })
          }

          // Parsing comments
          let count = localStorage.getItem(`comment_count${index}`);
          // Ensure that numberOfComments is initialized as an object
          let numberOfComments = [{ count: parseInt(count) }]; // Parse string to integer
          // Then you can update the count property
          numberOfComments[0].count = parseInt(count); // Parse string to integer

          commentCount();

        if (search.length > 0 && question.title.rendered.toLowerCase().includes(`${search.toLowerCase()}`) || userName.toLowerCase().includes(search.toLowerCase())) {
            
            // Highlight search words
            function renderedQuestion() {
                let title = question.title.rendered.split(' ');
                let array = [];
                for (let word of title) {
                    if (word.toLowerCase().includes(search.toLowerCase())) {
                        array.push(`<span class="highlight">${word}</span>`);
                    } else {
                        array.push(word);
                    }
                }
                return array.join(' ');
            }
            
        return (
        <Link to={{ pathname: `/question/${question.id}/`}} key={index}>
            <div className="card get-help-item mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className='col-lg-3 d-flex align-items-center'>
                            <div className='get-help'>
                                <img className="get-help-img mr-3" src={userProfileImg} />
                                <p><strong>{userName}</strong></p>
                            </div>
                        </div>
                        <div className='col-lg-5 d-flex align-items-center'>
                            {/* <p>{question.title.rendered.replace(search, `<p>${search}</p>`)}</p> */} 
                            <div dangerouslySetInnerHTML={{ __html: search.length > 0 ? renderedQuestion() : question.title.rendered } } />
                        </div>
                        <div className='col-lg-2 d-flex align-items-center justify-content-end'>
                            <p>{days == 0 ? "Posted today" : `${days}d ago`}</p>
                        </div>
                        <div className='col-lg-2 d-flex align-items-center justify-content-end'>
                            <p className="text-right">{ numberOfComments[0].count} {numberOfComments[0].count == 1 ? 'response' : 'responses'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
        )
        } 
        if (search.length == 0) {
        return (
            <Link to={{ pathname: `/question/${question.id}/` }} key={index}>
                <div className="card get-help-item mb-4">
                    <div className="card-body">
                        <div className="row">
                            <div className='col-lg-3 d-flex align-items-center'>
                                <div className='get-help'>
                                    <img className="get-help-img mr-3" src={userProfileImg ? userProfileImg : defaultImage} />
                                    <p><strong>{userName}</strong></p>
                                </div>
                            </div>
                            <div className='col-lg-5 d-flex align-items-center'>
                                <p>{question.title.rendered}</p>
                            </div>
                            <div className='col-lg-2 d-flex align-items-center justify-content-end'>
                                <p>{days == 0 ? "Posted today" : `${days}d ago`}</p>
                            </div>
                            <div className='col-lg-2 d-flex align-items-center justify-content-end'>
                                <p className="text-right">{ numberOfComments[0].count} {numberOfComments[0].count == 1 ? 'response' : 'responses'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            )
        }
    })

        // Pagination

        const itemsPerPage = 5; // Number of items to display per page
        const pageCount = Math.ceil(returnQuestions.length / itemsPerPage);
        
        const handlePageChange = (selectedPage) => {
          // Calculate the index range for the current page
          const startIndex = selectedPage * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          // Display data within the range
          const currentData = returnQuestions.slice(startIndex, endIndex);
          // Update your component state with the current data
          // or trigger a data fetch from an API
        };

    if ( userDetails != null) {
        return (
            <>
                <Navigation />
                <div className="get-help mb-5">
                    <div className='container primary'>
                        <div className='get-help-details'>
                            <div className="row mb-5">
                                <div className="col-12 d-flex">
                                <Link to="/" className="link-dark small d-flex align-items-center"><svg className="back-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>Home</Link><span className="breadcrumb-slash">/</span><span className="small">Ask Questions</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4">
                                    <p><strong>See questions from your peers</strong></p>
                                </div>
                                <div className="col-lg-4">
                                    <input type="search" className="form-control" placeholder='Start typing to search' value={search} onChange={(e) => {
                                        setSearch(e.target.value)
                                    }} />
                                </div>
                                <div className="col-lg-4 text-end">
                                    <a className="btn btn-info btn-lg" onClick={()=>{setModalClass("show-modal")}}>Ask a Question</a>
                                </div>
                            </div>
                        </div>
                        <hr className="mb-5"></hr>
                        {returnQuestions}
                        {/* <ReactPaginate
                        pageCount={pageCount}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageChange}
                        containerClassName="pagination"
                        activeClassName="active"
                        /> */}
                        {/* <PaginatedItems itemsPerPage={1} /> */}
                    </div>
                <div className={"modal"+" "+modalClass}>
                    <div className="container" >
                        <div className="row">
                            <div className="col-12">
                                <form className="modal-popup" id="popup-form" onSubmit={handleSubmit}>
                                    <div className="modal-popup-icon">
                                        <svg
                                        onClick={()=>{
                                        setAskQuestionStatus('not published')  
                                        setModalClass("hide-modal")  
                                        setAskQuestionApi({
                                            title: '',
                                            content: '',
                                            question_image: '',
                                        })
                                    }
                                        }
                                        width="12.103323mm"
                                        height="12.105565mm"
                                        viewBox="0 0 12.103323 12.105565"
                                        version="1.1"
                                        id="svg1"
                                        xmlnsinkscape="http://www.inkscape.org/namespaces/inkscape"
                                        xmlnssodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnssvg="http://www.w3.org/2000/svg">
                                        <sodipodinamedview
                                            id="namedview1"
                                            pagecolor="#ffffff"
                                            bordercolor="#666666"
                                            borderopacity="1.0"
                                            inkscapeshowpageshadow="2"
                                            inkscapepageopacity="0.0"
                                            inkscapepagecheckerboard="0"
                                            inkscapedeskcolor="#d1d1d1"
                                            inkscapedocument-units="mm" />
                                        <defs
                                            id="defs1" />
                                        <g
                                            inkscapelabel="Layer 1"
                                            inkscapegroupmode="layer"
                                            id="layer1"
                                            transform="translate(-6.9914114,-5.8580254)">
                                            <g
                                            id="g3"
                                            transform="translate(0.35406431,-0.60696738)">
                                            <rect
                                                
                                                id="rect2"
                                                width="3.4117243"
                                                height="10.152302"
                                                x="-1.5839893"
                                                y="12.740046"
                                                ry="0.35877365"
                                                rx="0"
                                                transform="rotate(-45)" />
                                            <rect
                                                
                                                id="rect2-7"
                                                width="3.4117243"
                                                height="10.152302"
                                                x="16.125717"
                                                y="-5.1964393"
                                                ry="0.35877365"
                                                rx="0"
                                                transform="rotate(45)" />
                                            </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 mb-4">
                                            <p className="lead"><strong>Have a technical question? Ask your peers</strong></p>
                                        </div>
                                        <div className="col-12 mb-4">
                                            <input className="form-control form-control-lg" type="text" name="title"  value={askQuestionApi.title} onChange={handleChange} aria-label='Question field' placeholder="Type your question briefly (140 characters max.)" autoComplete='off' required />
                                            { askQuestionApi.title.length == 140 ?
                                            <p className="small red">Maximum characters reached!</p> : '' }
                                        </div>
                                        <div className="col-12 mb-4">
                                            <Editor
                                              apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
                                              data-info="content"
                                              className="form-control form-control-lg" 
                                              init={{
                                                selector: 'textarea',
                                                placeholder: 'Give a detailed description of your question. Attach pictures if necessary.',
                                              toolbar: 'undo redo | bold italic underline | superscript subscript | alignleft aligncenter alignright | bullist numlist',
                                              }}
                                              onChange={handleChangeContent}
                                            />
                                        </div>
                                        <div className="col-4 mb-4">
                                            <input className="form-control form-control-lg" type="file" onChange={handleFileChange} />
                                        </div>
                                    </div>
                                    { askQuestionStatus === "published" ? 
                                    <div className="alert alert-success" role="alert">
                                        <p>Success! Your question has been published!</p>
                                    </div>
                                    : ''    
                                    }
                                    <button className="btn btn-info btn-sm"  type="submit">Submit</button>
                                </form>                 
                            </div>
                    </div>
                    </div>
                </div>
                </div>
            </>
        )
    } else {
        window.location.replace("/");
      }
}