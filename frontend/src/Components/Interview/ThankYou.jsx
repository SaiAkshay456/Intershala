import { useLocation } from 'react-router-dom';

const ThankYou = () => {
    const { state } = useLocation();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="max-w-md w-full space-y-8">
                {/* Checkmark */}
                <div className="flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Main Content */}
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-light text-gray-900">
                        Thank you, <span className="font-medium">{state?.userName || 'there'}</span>
                    </h1>

                    <p className="text-lg text-gray-600">
                        For interviewing for the <span className="text-indigo-600">{state?.jobPosition || ''}</span> position.
                    </p>
                </div>

                {/* What's Next Section */}
                <div className="text-center space-y-2 mt-4">
                    <h2 className="text-xl font-semibold text-gray-800">What’s next?</h2>
                    <p className="text-gray-600">
                        Our team will now review your interview responses carefully.
                    </p>
                    <p className="text-gray-500">
                        If you qualify, the recruiter will reach out to you via email.
                    </p>
                </div>

                {/* Footer Info */}
                <div className="text-center space-y-2">
                    <p className="text-gray-500 text-sm">
                        We'll review your interview and be in touch soon.
                    </p>
                    <p className="text-gray-400 text-xs">
                        Typically within 3-5 business days
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;
