import { useConversation } from "@elevenlabs/react";
import { useCallback, useRef, useState } from "react";
import { createDBClient } from "@/api/dbClient";
import { useNavigate } from "react-router-dom";

type Avatar = {
  name: string;
  role?: string;
  image?: string;
};

export function useConversationController() {
  const [micMuted, setMicMuted] = useState(false);
  const conversation = useConversation({ micMuted });
  const isSpeaking = conversation.isSpeaking;

  const micRef = useRef<MediaStream | null>(null);
  const startingRef = useRef(false); // 🔒 LOCK
  const stopRef = useRef(() => Promise.resolve());

  const loginResolverRef = useRef<((status: string) => void) | null>(null);

  const [activeAvatar, setActiveAvatar] = useState<string | null>(null);
  const [demoCategory, setDemoCategory] = useState<string>("Voicedots");
  const [error, setError] = useState<string | null>(null);

  const [loginOpen, setLoginOpen] = useState(false);

  const isConnected = conversation.status === "connected";
  const isConnecting = conversation.status === "connecting";

    // DATA COLLECTION STATE
  const [dataCollectionOpen, setDataCollectionOpen] = useState(false);
  const [dataConfirmed, setDataConfirmed] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [ticketData, setTicketData] = useState<any>(null);
  const [rollModalOpen, setRollModalOpen] = useState(false);
  const [rollModalKind] = useState<"fee" | "marks">("fee");
  // const [ticketData, setTicketData] = useState<any>(
  //   {
  //   studentId: "STUD123",
  //   name: "Test",
  //   email: "test@gmail.com",
  //   mobile: "121212",
  //   category: "Technical Support",
  //   subCategory: "Login Issue",
  //   description: "Testing the ticket submission with temporary data. Student cannot access the portal."
  // }
  // );

  const navigate = useNavigate();

  
  const handleUserDataCollected = async (data: any) => {
    setUserData(data);
    setDataCollectionOpen(false);

    await conversation.sendUserMessage(
      `Consider only this VALIDATED_USER_DATA:${JSON.stringify(data)}`
    );

    console.log("Collected user data:", data);
  };

  const ticketResponse = async (res: any) => {
    setTicketOpen(false);

    await conversation.sendUserMessage(
      `${JSON.stringify(res)}`
    );

    console.log(res);
  };


  const [tableState, setTableState] = useState({
    isOpen: false,
    isLoading: false,
    data: [] as Record<string, unknown>[],
    title: "Data"
  });

  const closeTable = () => setTableState(prev => ({ ...prev, isOpen: false }));

  const handleRollNumberSubmit = async (rollNo: string) => {
    setRollModalOpen(false);
    if (!rollNo?.trim()) return;
    setTableState({ isOpen: true, isLoading: true, data: [], title: `${rollNo} Student Fee Balance` });
    try {
      const result: any = await studentClient.callDatabase({
        query: "GetStudentFeeBalance",
        isProcedure: true,
        parameters: { "@RollNo": rollNo.trim() },
      } as any);
      const rows = Array.isArray(result) ? result : (Array.isArray(result?.data) ? result.data : []);
      setTableState(prev => ({ ...prev, isLoading: false, data: rows }));
    } catch (err) {
      console.error("Error fetching fee balance:", err);
      setTableState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const departmentClient = createDBClient(
    "https://insproplus.com/erpdevapi/api/voicebot/get_query_result",
    "KCGDEV",
    "4cCI6MTc2NzM4NDA2NywiaXNzIjoicGFscGFwLXByb2QtZW52aXJvbm1lbnQiLCJhdWQiOiJwYWxwYXBwcm9kdXNlcnMifQ",
    "VOICEBOT"
  );
  const studentClient = createDBClient(
    "https://insproplus.com/erpdevapi/api/voicebot/get_query_result",
    "STPDEV",
    "myCVi6BSCVqHgAPdfxntPeY5IqS2YNZXRjZUk8pmL8prVQ6JmEospYLE8u8u5",
    "VOICEBOT"
  );

  const handleLoginSuccess = async () => {
      if (loginResolverRef.current) {
      loginResolverRef.current('success');
      loginResolverRef.current = null;
    }
  };
  const handleLoginFailure = async () => {
      if (loginResolverRef.current) {
      loginResolverRef.current('failed');
      loginResolverRef.current = null;
    }
  };

  const navigation = (id: string) => {
    if (!id) return;

    if (id.toLowerCase() !== "home") {
      navigate(`/${id}`);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate("/");
    }
  };

  const toggleMic = () => {
    setMicMuted(v => !v);
  };

  const requestMic = async () => {
    if (micRef.current) return true; // ✅ already granted

    try {
      micRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      return true;
    } catch {
      setError("Microphone permission denied");
      return false;
    }
  };

  const getGreetingMessage = () => {
    const hour = new Date().getHours()

    if (hour < 12) {
      return "Good Morning"
    } else if (hour < 18) {
      return "Good Afternoon"
    } else {
      return "Good Evening"
    }
  }
  
  const start = useCallback(async (agentId: string, avatars: Avatar[]) => {
    // 🛑 HARD GUARDS
    if (startingRef.current) return;
    if (isConnected || isConnecting) return;
    console.log("Connecting with ElevenLabs")
    console.log("Agent ID: ", agentId)
    startingRef.current = true;
    stopRef.current = stop;

    const avatars_name = avatars.map((a: Avatar, i: number) => ({ [`avatar_${i+1}`]: a.name })).reduce((acc, curr) => ({ ...acc, ...curr }), {});
    const greeting = {
      greet: getGreetingMessage()
    };

    try {
      if (!(await requestMic())) return;

      setMicMuted(false);

      await conversation.startSession({
        agentId,
        connectionType: "webrtc",
        dynamicVariables: {...avatars_name, ...greeting},
        clientTools: {
          glowAvatar: async ({ name }: { name: string }) => {
            setActiveAvatar(name);
          },
          navigateToSection: async ({ id }: { id: string }) => {
            navigation(id);
          },
          externalPageNavigation: async ({ id }: { id: string }) => {
            console.log(`Navigating to external page: ${id}`);
            window.location.href = id;

            return `Navigated to ${id}`;
          },
          requestLogin: async () => {
            const loginPromise = new Promise<string>((resolve) => {
              loginResolverRef.current = resolve;
            });
            setLoginOpen(true);
            try {
              const status = await loginPromise;
              console.log("Login status:", status);
              
              if (status === 'success') {
                return 'success';
              } else {
                throw new Error('Login failed');
              }
            } catch (error) {
              console.error("Login error:", error);
              throw error;
            }
          },
          openValidationPopup: async ({
            name,
            email,
            phone,
            description,
          }: {
            name?: string;
            email?: string;
            phone?: string;
            description?: string;
          }) => {
            setUserData({
              name: name ?? "",
              email: email ?? "",
              phone: phone ?? "",
              description: description ?? "",
            });
            setDataConfirmed(false);
            setDataCollectionOpen(true);
          },

          raiseTicket: async ({
            studentId,
            name,
            email,
            mobile,
            category,
            subCategory,
            description,
            userId
          }: {
            studentId?: string;
            name?: string;
            email?: string;
            mobile?: string;
            category?: string;
            subCategory?: string;
            description?: string;
            userId?: string;
          }) => {
            setTicketData({
              studentId: studentId ?? "",
              name: name ?? "",
              email: email ?? "",
              mobile: mobile ?? "",
              category: category ?? "",
              subCategory: subCategory ?? "",
              description: description ?? "",
              userId: userId ?? "",
            });

            setTicketOpen(true);
          },

          getStaffNetPay: async ({ payMonthName, payYear, staffName }: { payMonthName: string, payYear: string, staffName: string }) => {
            setTableState({
              isOpen: true,
              isLoading: false,
              data: [],
              title: `Net Pay: ${payMonthName} ${payYear}, Staff: ${staffName}`
            });

            const payload = {   
              "query" : "sp_GetStaffNetPay",
              "isProcedure":true,
              "parameters": {
                "@PayMonthName": payMonthName,
                "@PayYear": payYear,
                "@StaffName": staffName
              },
            };
              try {
                const result = await departmentClient.callDatabase(payload);
                console.log("DB Result "+result);
                const rows = Array.isArray(result) ? result : [];
                setTableState(prev => ({
                ...prev,
                isLoading: false,
                data: rows
              }));
              }catch(err) {
                console.log(err);
            }
          },
          getTotalStaffCount: async () => {
            setTableState({
              isOpen: true,
              isLoading: false,
              data: [],
              title: `Appointed Staff Count`
            });

            const payload = {
              "query" : "sp_GetAppointedStaffCount",
              "isProcedure":true,
              "parameters": {
              },
            };
              try {
                const result = await departmentClient.callDatabase(payload);
                const rows = Array.isArray(result) ? result : [];
                setTableState(prev => ({
                ...prev,
                isLoading: false,
                data: rows
              }));
              }catch(err) {
                console.log(err);
            }
          },
          getStaffCountByDept: async ({ deptName }: { deptName?: string }) => {
            const hasDept = Boolean(deptName?.trim());
            console.log("depart name",deptName,hasDept)
            setTableState({
              isOpen: true,
              isLoading: false,
              data: [],
              title: hasDept
                ? `Appointed Staff Count by Department: ${deptName}`
                : "Appointed Staff Count by Department (All)"
            });

            const payload = {
              "query" : "sp_GetAppointedStaffCount_ByDept",
              "isProcedure":true,
              "parameters": hasDept
                  ? { "@DeptName": deptName }
                  : {},
            };
            try {
              const result = await departmentClient.callDatabase(payload);
              const rows = Array.isArray(result) ? result : [];
              setTableState(prev => ({
                ...prev,
                isOpen:true,
                isLoading: false,
                data: rows
              }));
            }catch(err) {
              console.log(err);
            }
          },
           getAllStaffData: async () => {

            setTableState({
              isOpen: true,
              isLoading: false,
              data: [],
              title: "Staff Details"
            });

            const payload = {
              "query" : "sp_GetStaffDetails",
              "isProcedure":true,
              "parameters":{}
            };
            try {
              const result = await departmentClient.callDatabase(payload);
              const rows = Array.isArray(result) ? result : [];
              setTableState(prev => ({
                ...prev,
                isLoading: false,
                data: rows
              }));
            }catch(err) {
              console.log(err);
            }
          },
          getStudentExamResults: async ({ regNo }: { regNo: string }) => {
            setTableState({
              isOpen: true,
              isLoading: false,
              data: [],
              title: `${regNo} Student Exam Results`
            });

            try {
              const payload = {
                query: "SP_GetStudentExamResults",
                isProcedure: true,
                parameters: {
                  "@RegNo": regNo
                }
              };

              const result = await studentClient.callDatabase(payload);
              const rows = Array.isArray(result) ? result : [];
              
              setTableState(prev => ({
                ...prev,
                isLoading: false,
                data: rows
              }));
            } catch (err) {
              console.error("Error fetching exam results:", err);
              setTableState(prev => ({ ...prev, isLoading: false }));
              throw err;
            }
          },

          getStudentFeeBalance: async ({ rollNo }: { rollNo: string }) => {
            setTableState({
              isOpen: true,
              isLoading: false,
              data: [],
              title: `${rollNo} Student Fee Balance`
            });

            try {
              const payload = {
                query: "GetStudentFeeBalance",
                isProcedure: true,
                parameters: {
                  "@RollNo": rollNo
                }
              };

              const result = await studentClient.callDatabase(payload);
              const rows = Array.isArray(result) ? result : [];
              
              setTableState(prev => ({
                ...prev,
                isLoading: false,
                data: rows
              }));
            } catch (err) {
              console.error("Error fetching fee balance:", err);
              setTableState(prev => ({ ...prev, isLoading: false }));
              throw err;
            }
          },

          loadCategoryDemo : async ({category}:{category : string}) =>{
            setDemoCategory(category);
          },
        }
      });
      // setActiveAvatar("SRK");
    } catch (err) {
      console.log(err);
      setError("Failed to start conversation");
    } finally {
      startingRef.current = false;
    }
  }, [conversation, isConnected, isConnecting]);

  const stop = async () => {
    startingRef.current = false;

    micRef.current?.getTracks().forEach(t => t.stop());
    micRef.current = null;
    setActiveAvatar(null);
    await conversation.endSession();
  };



  return {
    start,
    stop,
    isConnected,
    isConnecting,
    isSpeaking,
    activeAvatar,
    setActiveAvatar,
    toggleMic,
    micMuted,
    error,
    setError,
    tableState, 
    closeTable,
    loginOpen,
    setLoginOpen,
    handleLoginSuccess,
    handleLoginFailure,
    dataCollectionOpen,
    setDataCollectionOpen,
    handleUserDataCollected,
    userData,
    setUserData,
    dataConfirmed,
    demoCategory,
    ticketOpen,
    setTicketOpen,
    ticketData,
    ticketResponse,
    rollModalOpen,
    setRollModalOpen,
    rollModalKind,
    handleRollNumberSubmit
  };
}